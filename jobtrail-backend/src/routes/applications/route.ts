import Elysia from "elysia";
import { postApplicationSchema, getApplicationSchema, putApplicationSchema } from "./schema";
import { db } from "../../db/db";
import { applicationsTable } from "../../db/schema";
import { eq } from "drizzle-orm";


export const applicationRouter = new Elysia({ prefix: "/applications" })
    .post("/", async({ body, set }) => {
        const { companyName, email, applicationStatus } = body

        if(companyName == "" || email == "" || applicationStatus == "") {
            set.status = 400
            throw "All fields are required"
        }

        const result = await db.insert(applicationsTable)
            .values(body)
            .returning()

        const name = result[0].companyName

        return `Application ${name} has been created`
        
    }, postApplicationSchema)


    .get("/",async() => {
        const results = await db.select().from(applicationsTable)
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

        const { companyName, email, applicationStatus } = body

        if(companyName == "" || email == "" || applicationStatus == "") {
            set.status = 400
            throw "All fields are required"
        }
        
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