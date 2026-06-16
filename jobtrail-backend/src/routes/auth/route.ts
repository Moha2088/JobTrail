import Elysia from "elysia"
import { loginSchema } from "./schema"
import { db } from "../../db/db"
import { usersTable } from "../../db/schema"
import { eq } from "drizzle-orm"
import { getUser } from "../../utils/users/getUser"
import { StatusCodes } from "http-status-codes"


export const authRouter = new Elysia({ prefix :"/auth" })
    .post("/login", async({ jwt, body, set }) => {
        const { email, password } = body

        const result = await db.select()
            .from(usersTable)
            .where(eq(usersTable.email, email))

        if (result.length == 0) {
            set.status = StatusCodes.UNAUTHORIZED
            throw "Unauthorized"
        }

        const isMatch = await Bun.password.verify(password, result[0].password)

        if(!isMatch) {
            set.status = StatusCodes.UNAUTHORIZED
            return "Password is incorrect!"
        }

        const { sub, name } = await getUser(result[0].id)

        const value =  await jwt.sign({
            sub,
            name,
            email
        })

        return {
            accessToken: value
        }

    }, loginSchema)

    .post("/logout", async({ set, cookie: { auth } }) => {
        auth.remove()
        set.status = 204
        return
    })