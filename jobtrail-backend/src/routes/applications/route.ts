import Elysia from "elysia";
import {
    postApplicationSchema, getApplicationSchema, putApplicationSchema, deleteApplicationsSchema,
    getFileSchema, patchApplicationContentSchema,
    searchContentSchema,
    cancelDeletionSchema
} from "./schema";
import { db } from "../../db/db";
import { applicationsTable } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import { getClaims } from "../../utils/auth/getClaims"
import { getApplication } from "../../utils/applications"
import { Application } from "./types"
import { StatusCodes } from "http-status-codes";
import { uploadToR2, getFile, deleteFile, fileExists } from "../../utils/r2";
import { searchContent } from "../../utils/search-engine/searchContent";
import { getJobPostings } from "../../utils/jobPostings/getJobPostings";


const validate = async (
    id: number,
    authorization: string,
    set: { status?: number | string }
) => {
    const application = await getApplication(id)
    const claims = await getClaims(authorization)

    if(claims.sub != application.userId) {
        set.status = StatusCodes.FORBIDDEN
        throw "Forbidden"
    }
}

export const applicationRouter = new Elysia({ prefix: "/applications" })
    // @ts-ignore
    .onBeforeHandle(async({ set, headers: { authorization }, route}) => {
        if(!authorization) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }
    })

    // @ts-ignore
    .post("/", async({ body, set, jwt, headers: { authorization } }) => {
        const { companyName, email, applicationStatus, position, content } = body

        console.log("Body: ")
        console.log(body)

        const claims = await getClaims(authorization!)

        const result = await db.insert(applicationsTable)
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
    // @ts-ignore
    .get("/",async({jwt, headers: { authorization }}) => {
        // const claims: ClaimTypes = await jwt.verify(auth.value)

        const claims = await getClaims(authorization!)

        const results = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.userId, claims.sub))

        const applications: Application[] = results.map(app => {
            return {
                id: app.id,
                companyName: app.companyName,
                email: app.email,
                applicationStatus: app.applicationStatus,
                position: app.position,
                content: app.content,
            }
        })


        return {
            applications: applications,
            metrics: {
                pendingCount: applications.filter(app => app.applicationStatus == "PENDING").length,
                rejectedCount: applications.filter(app => app.applicationStatus == "REJECTED").length,
                acceptedCount: applications.filter(app => app.applicationStatus == "ACCEPTED").length,
            }
        }
    })


    .get("/:id", async({ params, set, headers: { authorization } }) => {
        const id = Number(params.id)

        await validate(id, authorization!, set)
        
        const result = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.id, id))
       
        if(result.length == 0) {
            set.status = StatusCodes.NOT_FOUND
            throw `Application with id: ${id} not found`
        }

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


    .get("/search", async({ query, set, headers: { authorization } }) => {
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


    .delete("/:id", async({params, set, headers: { authorization }}) => {
        const { id } = params

        const { sub } = await getClaims(authorization!)

        await validate(id, authorization!, set)

        await db.delete(applicationsTable)
        .where(eq(applicationsTable.id, id))

        set.status = StatusCodes.NO_CONTENT
    }, deleteApplicationsSchema)


    .patch("/:id/content", async({ params, body, set, headers: { authorization } }) => {
        const { id } = params
        const { content } = body
        await validate(Number(params.id), authorization!, set)

        const result = await db.update(applicationsTable)
            .set({ content: body.content})
            .where(eq(applicationsTable.id, Number(params.id)))

    }, patchApplicationContentSchema)

    // Files

    .post("/resume", async({ body, set, headers: { authorization }}) => {
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


    .get("/resume/:key", async({ params, set, headers: { authorization }}) => {
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


    .delete("/:id/resume/:key", async({ params, set, headers: { authorization }}) => {
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