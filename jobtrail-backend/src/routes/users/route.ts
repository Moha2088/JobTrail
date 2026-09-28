import Elysia from "elysia"
import { cancelUserDeletionSchema, createUserSchema, deleteUserSchema, getUserSchema, patchUserSchema } from "./schema"
import { db } from "../../db/db"
import { applicationsTable, usersTable } from "../../db/schema"
import { eq } from "drizzle-orm"
import { getClaims } from "../../utils/auth/getClaims"
import { StatusCodes } from "http-status-codes"
import { requestDeleteUserJob } from "../../messaging/events/users/deleteUser/requestDeleteUserJob"
import { cancelUserDeletion } from "../../messaging/events/users/cancelUserDeletion/cancelUserDeletion"
import { sendDeleteRequestMail } from "../../utils/mail/sendDeleteRequestMail"
import { sendDeletionCancelledMail } from "../../utils/mail/sendDeletionCancelledMail"
import { getUser } from "../../utils/users/getUser"
import { logger } from "../../logger"

interface PatchUser {
    name: string
    email: string
    password: string
}

const validate = async (
    id: number,
    authorization: string,
    set: { status?: number | string }
) => {    

    const user = await getUser(id)

    if(!user) {
        set.status = StatusCodes.NOT_FOUND
        return
    }

    const claims = await getClaims(authorization)

    if(claims.sub != user?.sub) {
        set.status = StatusCodes.FORBIDDEN
        throw "Unauthorized"
    }
}

export const userRouter = new Elysia({ prefix: "/users" })
    .post("/", async({ body, set }) => {
        const UNIQUE_CONSTRAINT_VIOLATION_CODE = "23505"
        
        body.password = await Bun.password.hash(body.password, {
            algorithm: "argon2d"
        })

        try {
            await db.insert(usersTable)
                .values(body)
        }

        catch(error) {
            if(error.cause.code == UNIQUE_CONSTRAINT_VIOLATION_CODE) {
                logger.error("Error creating user", {
                    email: body.email,
                    message: "User with that email alrady exists"
                })

                set.status = StatusCodes.CONFLICT
                return {
                    message: "User with that email exists"
                }
            }

            return {
                error
            }
        }

        set.status = StatusCodes.CREATED
    }, createUserSchema)

    .onBeforeHandle(async({ set, headers: { authorization } }) =>{
        if(!authorization) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }

        const claims = await getClaims(authorization!)
        const { sub } = claims
        if(!sub) {
            set.status = StatusCodes.UNAUTHORIZED
            return { message: "Unauthorized" }
        }
    })
    
    .get("/:id", async({ params, set, headers: { authorization } }) => {
        if(!authorization) {
            set.status = StatusCodes.UNAUTHORIZED
            return
        }

        const claims = await getClaims(authorization!)

        if(!claims) {
            set.status = StatusCodes.UNAUTHORIZED
        }

        const id = Number(params.id)

        await validate(id, authorization, set)

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

    .patch("/:id", async({ params, body, set }) => {
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

        const updates: Partial<PatchUser> = { }

        if(body.name) updates.name = body.name
        if(body.email) updates.email = body.email
        if(body.password) updates.password = body.password

        const updateResult = await db.update(usersTable)
            .set(body)
            .where(eq(usersTable.id, id))
            .returning({ name: usersTable.name, email: usersTable.email })

        logger.info("User updated!", {
            userId: id,
        })

        return {
            name: updateResult[0].name,
            email: updateResult[0].email,
        }

    }, patchUserSchema)

    .post("/cancel-deletion/:id", async({ set, params, headers: { authorization } }) => {
        
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

        const user = await getUser(id)

        if(!user) {
            set.status = StatusCodes.NOT_FOUND
            return
        }
        
        const { email, pendingDeletion } = user

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

    .delete("/:id", async({ params, set, headers: { authorization } }) => {
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

        const user = await getUser(id)

        if(!user) {
            set.status = StatusCodes.NOT_FOUND
            return
        }

        const { email } = user


        await requestDeleteUserJob(id)
        await sendDeleteRequestMail({
            id,
            email
        })

        await db.update(usersTable)
            .set({ pendingDeletion: true })
            .where(eq(usersTable.id, id))

        set.status = StatusCodes.NO_CONTENT
    }, deleteUserSchema)