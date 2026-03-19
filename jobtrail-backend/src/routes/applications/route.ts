import Elysia from "elysia";
import {
    postApplicationSchema, getApplicationSchema, putApplicationSchema, deleteApplicationsSchema,
} from "./schema";
import { db } from "../../db/db";
import { applicationsTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getClaims } from "../../utils/auth/getClaims"
import { getApplication } from "../../utils/applications"
import { Application } from "./types"

const validate = async (
    id: number,
    authorization: string,
    set: { status?: number | string }
) => {
    const application = await getApplication(id)
    const claims = await getClaims(authorization)

    if(claims.sub != application.userId) {
        set.status = 401
        return "Unauthorized"
    }
}

export const applicationRouter = new Elysia({ prefix: "/applications" })
    // @ts-ignore
    .onBeforeHandle(async({ set, headers: { authorization }, route}) => {
        if(!authorization) {
            set.status = 401
            return "Unauthorized"
        }
    })

    // @ts-ignore
    .post("/", async({ body, set, jwt, headers: { authorization } }) => {
        const { companyName, email, applicationStatus, position, content } = body

        if(!authorization) {
            set.status = 401
            return
        }

        console.log("Body: ")
        console.log(body)

        const claims = await getClaims(authorization)

        const result = await db.insert(applicationsTable)
            .values({
                companyName: companyName,
                email: email,
                applicationStatus: applicationStatus,
                position: position,
                userId: claims.sub,
                content: content
            })

            set.status = 201

    }, postApplicationSchema)
    // @ts-ignore
    .get("/",async({jwt, headers: { authorization }}) => {
        // const claims: ClaimTypes = await jwt.verify(auth.value)

        const claims = await getClaims(authorization!)

        const results = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.userId, claims.sub))

        console.log(results)

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

        const unauthorized = await validate(id, authorization!, set)
        if(unauthorized) {
            return unauthorized
        }

        const result = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.id, id))
       
        if(result.length == 0) {
            set.status = 404
            throw `Application with id: ${id} not found`
        }

        return {
            id: result[0].id,
            companyName: result[0].companyName,
            email: result[0].email,
            applicationStatus: result[0].applicationStatus,
            position: result[0].position,
            createdAt: result[0].createdAt,
            content: result[0].content
        }

    }, getApplicationSchema)


    .put("/:id", async({ params, body, set, headers: { authorization } }) => {
        const id = Number(params.id)

        const unauthorized = await validate(id, authorization!, set)
        if(unauthorized) {
            return unauthorized
        }

        await db.update(applicationsTable)
            .set(body)
            .where(eq(applicationsTable.id, id))

        set.status = 204

    }, putApplicationSchema)


    .delete("/:id", async({params, set, headers: { authorization }}) => {
        const id = Number(params.id)

        const unauthorized = await validate(id, authorization!, set)
        if(unauthorized) {
            return unauthorized
        }
        
        await db.delete(applicationsTable).where(eq(applicationsTable.id, id))

        set.status = 204
    }, deleteApplicationsSchema)