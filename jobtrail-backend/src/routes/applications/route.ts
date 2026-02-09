import Elysia from "elysia";
import { createApplicationSchema, getApplicationSchema } from "./schema";
import { db } from "../../db/db";
import { applicationsTable } from "../../db/schema";
import { CreateApplicationDTO } from "../../dtos/application/createApplicationDTO";
import { eq } from "drizzle-orm";

export const applicationRouter = new Elysia({ prefix: "/applications" })
    .post("/", async({ body, set }) => {
        const { companyName, email, applicationStatus } = body

        const dto = body as CreateApplicationDTO

        if(companyName == "" || email == "" || applicationStatus == "") {
            set.status = 400
            throw "All fields are required"
        }

        const result = await db.insert(applicationsTable)
            .values(dto)
            .returning({ companyName: applicationsTable.companyName })

        const name = result[0].companyName
        
        return `User ${name} has been created`

    }, createApplicationSchema)
    
    
    .get("/",async({set}) => {
        const results = await db.select().from(applicationsTable)
        return results
    })


    .get("/:id", async({ params, set }) => {
        const id = Number(params.id)

        const result = await db.select().from(applicationsTable)
        .where(eq(applicationsTable.id, id))
       
        if(!result) {
            set.status = 404
            throw "Application not found"
        }

        return result[0]

    }, getApplicationSchema)

    .delete("/:id", async({params, set}) => {
        const id = Number(params.id)
        const result = await db.delete(applicationsTable)
            .where(eq(applicationsTable.id, id))
    })