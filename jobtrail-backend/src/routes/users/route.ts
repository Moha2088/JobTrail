import Elysia from "elysia";
import { createUserSchema, putUserSchema } from "./schema";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema";
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


    .get("/:id", async({ params, set }) => {
        const id = Number(params.id)

        const result = await db.select()
            .from(usersTable)
            .where(eq(usersTable.id, id))

        if (result.length == 0) {
            set.status = 404
        }


        return {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email
        }
    })

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
    })