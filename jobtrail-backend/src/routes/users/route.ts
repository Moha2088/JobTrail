import Elysia from "elysia";
import { createUserSchema, deleteUserSchema, getUserSchema, putUserSchema } from "./schema";
import { db } from "../../db/db";
import { applicationsTable, usersTable } from "../../db/schema";
import { eq } from "drizzle-orm"
import { getClaims } from "../../utils/auth/getClaims"
import { StatusCodes } from "http-status-codes"


export const userRouter = new Elysia({ prefix: "/users" })
    .post("/", async({ body, set }) => {
        body.password = await Bun.password.hash(body.password, {
            algorithm: "argon2d"
        })

        const result = await db.insert(usersTable)
            .values(body)
            .returning()

        set.status = StatusCodes.CREATED
        
        // return {
        //     id: result[0].id,
        //     name: result[0].name,
        //     email: result[0].email,
        // }

    }, createUserSchema)

    // @ts-ignore
    .onBeforeHandle(async({jwt, set, headers: { authorization } }) =>{
        const claims = await getClaims(authorization!)
        const { sub } = claims
        if(!sub) {
            set.status = StatusCodes.UNAUTHORIZED
            return { message: "Unauthorized" }
        }
    })
    
    // @ts-ignore
    .get("/:id", async({ params, set, jwt, headers: { authorization } }) => {
        if(!authorization) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }

        const claims: ClaimTypes = await getClaims(authorization!)

        if(!claims) {
            set.status = StatusCodes.UNAUTHORIZED
        }

        const id = Number(params.id)

        const result = await db.select()
            .from(usersTable)
            .where(eq(usersTable.id, id))
            .leftJoin(applicationsTable, eq(applicationsTable.userId, usersTable.id))

        if (result.length == 0) {
            set.status = StatusCodes.NOT_FOUND
            return
        }

        return {
            id: result[0].users.id,
            name: result[0].users.name,
            email: result[0].users.email,
            createdAt: result[0].users.createdAt,
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
            set.status = StatusCodes.NOT_FOUND
            return
        }

        body.password = await Bun.password.hash(body.password, {
            algorithm: "argon2d"
        })

        await db.update(usersTable)
            .set(body)
            .where(eq(usersTable.id, id))

    }, putUserSchema)

    .delete("/:id", async({params, set, headers: { authorization }}) => {
        const claims = await getClaims(authorization!)

        if(!claims) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }

        const id = Number(params.id)

        await db.delete(usersTable)
            .where(eq(usersTable.id, id))

        set.status = StatusCodes.NO_CONTENT
    }, deleteUserSchema)