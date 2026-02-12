import Elysia from "elysia";
import { createUserSchema, deleteUserSchema, getUserSchema, putUserSchema } from "./schema";
import { db } from "../../db/db";
import { applicationsTable, usersTable } from "../../db/schema";
import { eq } from "drizzle-orm"


export const userRouter = new Elysia({ prefix: "/users" })
    .post("/", async({ body, set }) => {
        body.password = await Bun.password.hash(body.password)

        const result = await db.insert(usersTable)
            .values(body)
            .returning()

        set.status = 201
        
        return {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
        }

    }, createUserSchema)


    .get("/:id", async({ params, set, jwt, cookie: { auth } }) => {

        const claims: ClaimTypes = await jwt.verify(auth.value)
        const id = Number(params.id)

        const result = await db.select()
            .from(usersTable)
            .where(eq(usersTable.id, id))
            .leftJoin(applicationsTable, eq(applicationsTable.userId, usersTable.id))

        if (result.length == 0) {
            set.status = 404
            return
        }

        return {
            id: result[0].users.id,
            name: result[0].users.name,
            email: result[0].users.email,
            applications: [
                result.map(s => s.applications)
            ]
        }
    }, getUserSchema)

    .put("/:id", async({params, body, set}) => {
        const id = Number(params.id)

        const result = await db.select()
            .from(usersTable)
            .where(eq(usersTable.id, id))

        if(result.length == 0) {
            set.status = 404
            return
        }

        await db.update(usersTable)
            .set(body)
            .where(eq(usersTable.id, id))

    }, putUserSchema)

    .delete("/:id", async({params, set}) => {
        const id = Number(params.id)

        await db.delete(usersTable)
            .where(eq(usersTable.id, id))

        set.status = 204
    }, deleteUserSchema)