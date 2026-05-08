import Elysia from "elysia";
import { cancelUserDeletionSchema, createUserSchema, deleteUserSchema, getUserSchema, putUserSchema } from "./schema";
import { db } from "../../db/db";
import { applicationsTable, usersTable } from "../../db/schema";
import { eq } from "drizzle-orm"
import { getClaims } from "../../utils/auth/getClaims"
import { StatusCodes } from "http-status-codes"
import { requestDeleteUserJob } from "../../messaging/events/users/deleteUser/requestDeleteUserJob";
import { cancelUserDeletion } from "../../messaging/events/users/cancelUserDeletion/cancelUserDeletion";


export const userRouter = new Elysia({ prefix: "/users" })
    .post("/", async({ body, set }) => {
        body.password = await Bun.password.hash(body.password, {
            algorithm: "argon2d"
        })

        const result = await db.insert(usersTable)
            .values(body)
            .returning()

        set.status = StatusCodes.CREATED
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
            pendingDeletion: result[0].users.pendingDeletion,
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

    .post("/cancel-deletion/:id", async({set, params, headers: { authorization }}) => {
        
        const claims = await getClaims(authorization!)

        if(!claims) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }

        const id = Number(params.id)

        if (id != claims.sub) {
            set.status = StatusCodes.FORBIDDEN
            return
        }

        await cancelUserDeletion(id)

    }, cancelUserDeletionSchema)

    .delete("/:id", async({params, set, headers: { authorization }}) => {
        const claims = await getClaims(authorization!)

        if(!claims) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }

        const id = Number(params.id)

        if(claims.sub != id) {
            set.status = StatusCodes.FORBIDDEN
            return
        }

        await requestDeleteUserJob(id)

        await db.update(usersTable)
        .set({ pendingDeletion: true })
        .where(eq(usersTable.id, id))

        console.log("Users is pending deletion!")

        set.status = StatusCodes.NO_CONTENT
    }, deleteUserSchema)