import Elysia from "elysia";
import { cancelUserDeletionSchema, createUserSchema, deleteUserSchema, getUserSchema, putUserSchema } from "./schema";
import { db } from "../../db/db";
import { applicationsTable, usersTable } from "../../db/schema";
import { eq } from "drizzle-orm"
import { getClaims } from "../../utils/auth/getClaims"
import { StatusCodes } from "http-status-codes"
import { requestDeleteUserJob } from "../../messaging/events/users/deleteUser/requestDeleteUserJob";
import { cancelUserDeletion } from "../../messaging/events/users/cancelUserDeletion/cancelUserDeletion";
import { emailExists } from "../../utils/users/emailExists";
import { DatabaseError } from "pg";
import { sendDeleteRequestMail } from "../../utils/mail/sendDeleteRequestMail";
import { sendDeletionCancelledMail } from "../../utils/mail/sendDeletionCancelledMail";
import { getUser } from "../../utils/users/getUser";


export const userRouter = new Elysia({ prefix: "/users" })
    .post("/", async({ body, set }) => {
        const UNIQUE_CONSTRAINT_VIOLATION_CODE = "23505"
        
        if(await emailExists(body.email)) {
            set.status = StatusCodes.CONFLICT
            return {
                message: "User with that email exists"
            }
        }
        
        body.password = await Bun.password.hash(body.password, {
            algorithm: "argon2d"
        })

        try {
            await db.insert(usersTable)
            .values(body)
        }

        catch(error) {
            if(error instanceof DatabaseError && error.code == UNIQUE_CONSTRAINT_VIOLATION_CODE) {
                set.status = StatusCodes.CONFLICT
                return {
                    message: "User with that email exists"
                }
            }

            throw error
        }

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

        const updateResult = await db.update(usersTable)
            .set(body)
            .where(eq(usersTable.id, id))
            .returning({ name: usersTable.name, email: usersTable.email })

        return {
            name: updateResult[0].name,
            email: updateResult[0].email,
        }

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

        const { email, pendingDeletion } = await getUser(id)

        if (!pendingDeletion) {
            set.status = StatusCodes.CONFLICT
            return { message: "User is not pending deletion" }
        }

        await cancelUserDeletion(id)
        await sendDeletionCancelledMail({
            id,
            email
        })

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

        const { email } = await getUser(id)


        await requestDeleteUserJob(id)
        await sendDeleteRequestMail({
            id,
            email
        })

        await db.update(usersTable)
        .set({ pendingDeletion: true })
        .where(eq(usersTable.id, id))

        console.log(`User with id: ${id} is scheduled for deletion`)

        set.status = StatusCodes.NO_CONTENT
    }, deleteUserSchema)