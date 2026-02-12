import Elysia from "elysia";
import { postApplicationSchema, getApplicationSchema, putApplicationSchema } from "./schema";
import { db } from "../../db/db";
import { applicationsTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { authMiddleware } from "../../middleware/auth.middleware";


export const applicationRouter = new Elysia({ prefix: "/applications" })
    // .use(authMiddleware)
    .onBeforeHandle(async({jwt, cookie: { auth }, set}) => {
        const claims: ClaimTypes = await jwt.verify(auth.value)
        
        if(!claims.sub) {
            set.status = 401
            return "No id was found in claims!"
        }
    })
    .post("/", async({ body, set, jwt, cookie: { auth } }) => {
        const { companyName, email, applicationStatus, position } = body

        const claims: ClaimTypes = await jwt.verify(auth.value)

        const currentUser = claims.sub

        const result = await db.insert(applicationsTable)
            .values({
                companyName: companyName,
                email: email,
                applicationStatus: applicationStatus,
                position: position,
                userId: claims.sub
            })
            .returning()

        const name = result[0].companyName

        return `Application ${name} has been created`

    }, postApplicationSchema)


    .get("/",async({jwt, cookie: { auth }}) => {
        const claims: ClaimTypes = await jwt.verify(auth.value)

        const results = await db.select().from(applicationsTable)
            .where(eq(applicationsTable.id, claims.sub))

        return results
    })


    .get("/:id", async({ params, set }) => {
        const id = Number(params.id)

        const result = await db.select()
            .from(applicationsTable)
            .where(eq(applicationsTable.id, id))
       
        if(result.length == 0) {
            set.status = 404
            throw `Application with id: ${id} not found`
        }

        return result[0]

    }, getApplicationSchema)

    .put("/:id", async({ params, body, set }) => {
        const id = Number(params.id)

        await db.update(applicationsTable)
            .set(body)
            .where(eq(applicationsTable.id, id))

        set.status = 204

    }, putApplicationSchema)


    .delete("/:id", async({params, set}) => {
        const id = Number(params.id)
        
        await db.delete(applicationsTable).where(eq(applicationsTable.id, id))

        set.status = 204
    })