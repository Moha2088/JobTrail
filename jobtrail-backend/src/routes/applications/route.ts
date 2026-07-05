import Elysia from "elysia"
import {
    postApplicationSchema, getApplicationSchema, putApplicationSchema, deleteApplicationsSchema,
    getFileSchema, patchApplicationContentSchema,
    searchContentSchema,
    getApplicationsSchema
} from "./schema"
import { db } from "../../db/db"
import { applicationsTable } from "../../db/schema"
import { desc, eq } from "drizzle-orm"
import { getClaims } from "../../utils/auth/getClaims"
import { getApplication } from "../../utils/applications"
import { Application } from "./types"
import { StatusCodes } from "http-status-codes"
import { uploadToR2, getFile, deleteFile, fileExists } from "../../utils/r2"
import { searchContent } from "../../utils/search-engine/searchContent"


const validate = async (
    id: number,
    authorization: string,
    set: { status?: number | string }
) => {
    const application = await getApplication(id)

    if(!application) {
        set.status = StatusCodes.NOT_FOUND
        return
    }

    const claims = await getClaims(authorization)

    if(claims.sub != application.userId) {
        set.status = StatusCodes.FORBIDDEN
        throw "Unauthorized"
    }
}

export const applicationRouter = new Elysia({ prefix: "/applications" })
    .onBeforeHandle(async({ set, headers: { authorization } }) => {
        if(!authorization) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }
    })

    .post("/", async({ body, set, headers: { authorization } }) => {
        const { companyName, email, applicationStatus, position, content } = body

        console.log("Body: ")
        console.log(body)

        const claims = await getClaims(authorization!)

        await db.insert(applicationsTable)
            .values({
                companyName: companyName,
                email: email,
                applicationStatus: applicationStatus,
                position: position,
                userId: claims.sub,
                content: content
            })

        set.status = StatusCodes.CREATED

    }, postApplicationSchema)

    .get("/",async({ query, headers: { authorization } }) => {
        const claims = await getClaims(authorization!)

        const { limit } = query

        const results = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.userId, claims.sub))
            .limit(limit + 1)
            .offset((query.page - 1) * (limit))
            .orderBy(desc(applicationsTable.createdAt))

        const statusResults = await db.select({ applicationStatus: applicationsTable.applicationStatus })
            .from(applicationsTable)
            .where(eq(applicationsTable.userId, claims.sub))

        const hasMore = results.length > limit

        const applications: Application[] = hasMore ? results.slice(0, -1).map(app => {
            return {
                id: app.id,
                companyName: app.companyName,
                email: app.email,
                applicationStatus: app.applicationStatus,
                position: app.position,
                content: app.content
            }
        }) :
            results.map(app => {
                return {
                    id: app.id,
                    companyName: app.companyName,
                    email: app.email,
                    applicationStatus: app.applicationStatus,
                    position: app.position,
                    content: app.content
                }
            })

        return {
            hasMore,
            applications,
            metrics: {
                pendingCount: statusResults.filter(app => app.applicationStatus == "PENDING").length,
                rejectedCount: statusResults.filter(app => app.applicationStatus == "REJECTED").length,
                acceptedCount: statusResults.filter(app => app.applicationStatus == "ACCEPTED").length,
            }
        }
    }, getApplicationsSchema)


    .get("/:id", async({ params, set, headers: { authorization } }) => {
        const id = Number(params.id)

        await validate(id, authorization!, set)

        const result = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.id, id))

        return {
            id: result[0].id,
            companyName: result[0].companyName,
            email: result[0].email,
            applicationStatus: result[0].applicationStatus,
            position: result[0].position,
            createdAt: result[0].createdAt,
            content: result[0].content,
            key: result[0].key
        }

    }, getApplicationSchema)


    .get("/search", async({ query, headers: { authorization } }) => {
        const { q } = query

        const claims = await getClaims(authorization!)

        const searchResults = await searchContent(q, claims.sub)

        return searchResults
        
    }, searchContentSchema)

    .patch("/:id", async({ params, body, set, headers: { authorization } }) => {
        const id = Number(params.id)

        await validate(id, authorization!, set)

        await db.update(applicationsTable)
            .set(body)
            .where(eq(applicationsTable.id, id))

        set.status = StatusCodes.NO_CONTENT

    }, putApplicationSchema)


    .delete("/:id", async({ params, set, headers: { authorization } }) => {
        const { id } = params

        const { sub } = await getClaims(authorization!)

        const applicationToDelete =  await getApplication(id)

        if(!applicationToDelete) {
            set.status = StatusCodes.NOT_FOUND
            return
        }

        await validate(id, authorization!, set)

        await db.delete(applicationsTable)
            .where(eq(applicationsTable.id, id))

        set.status = StatusCodes.NO_CONTENT
    }, deleteApplicationsSchema)


    .patch("/:id/content", async({ params, body, set, headers: { authorization } }) => {
        const { id } = params
        const { content } = body
        
        await validate(Number(id), authorization!, set)

        await db.update(applicationsTable)
            .set({ content: content })
            .where(eq(applicationsTable.id, Number(params.id)))

    }, patchApplicationContentSchema)
    
// Files

    .post("/resume", async({ body, set, headers: { authorization } }) => {
        const claims = await getClaims(authorization!)

        console.log("Received file upload request")
        const file = body.file as File
        const buffer = await file.arrayBuffer()
        
        const { key } = await uploadToR2({
            buffer: buffer,
            name: file.name,
            applicationId: body.applicationId as string
        })

        const result = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.id, body.applicationId) && eq(applicationsTable.userId, claims.sub))

        if(result.length == 0) {
            set.status = StatusCodes.NOT_FOUND
            throw `Application with id: ${body.applicationId} not found`
        }
        
        await db.update(applicationsTable)
            .set({ key: key })
            .where(eq(applicationsTable.id, body.applicationId))

        set.status = StatusCodes.NO_CONTENT
    })


    .get("/resume/:key", async({ params, set, headers: { authorization } }) => {
        const { sub } = await getClaims(authorization!)

        const { key }  = params

        if(!key || key === "undefined") {
            set.status = StatusCodes.BAD_REQUEST
            throw "Key is required"
        }

        const result = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.key, key) && eq(applicationsTable.userId, sub))

        if(result.length == 0) {
            set.status = StatusCodes.NOT_FOUND
            throw `Application with key: ${key} not found`
        }

        if(!await fileExists(key)) {
            return
        }

        const signedUrl = await getFile({
            key: key
        })

        if(!signedUrl) {
            set.status = StatusCodes.NOT_FOUND
            throw "File not found"
        }

        set.status = StatusCodes.OK
        return signedUrl

    }, getFileSchema)


    .delete("/:id/resume/:key", async({ params, set, headers: { authorization } }) => {
        const { key, id }  = params
        const { sub } = await getClaims(authorization!)

        const result = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.key, key)
                && eq(applicationsTable.id, Number(id))
                && eq(applicationsTable.userId, sub))

        if (result.length == 0) {
            set.status = StatusCodes.NOT_FOUND
            throw `Application with id: ${id} and key: ${key} not found`
        }

        await deleteFile(key)

        await db.update(applicationsTable)
            .set({ key: null })
            .where(eq(applicationsTable.key, key) && eq(applicationsTable.id, Number(id)))

        set.status = StatusCodes.NO_CONTENT
    })