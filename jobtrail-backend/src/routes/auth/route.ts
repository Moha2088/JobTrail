import Elysia from "elysia";
import { loginSchema } from "./schema";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { jwt } from "@elysiajs/jwt"
import { getUser } from "../../utils/users/getUser"


export const authRouter = new Elysia({ prefix :"/auth" })
    // @ts-ignore
    .post("/login", async({ jwt, body, set, headers}) => {
        const { email, password } = body


        console.log("---- Getting header values ----")
        console.log(headers)

        const result = await db.select()
            .from(usersTable)
            .where(eq(usersTable.email, email))

        if (result.length == 0) {
            set.status = 401
            throw "Unauthorized"
        }

        const isMatch = await Bun.password.verify(password, result[0].password)

        if(!isMatch) {
            set.status = 401
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

    // @ts-ignore
    .post("/logout", async({jwt, set, cookie: { auth }}) => {
        auth.remove()
        set.status = 204
        return
    })

    // @ts-ignore
    .get("/me", async({jwt, cookie: { auth }}) => {
        const claims: ClaimTypes = await jwt.verify(auth.value)
        const user = await db.select()
            .from(usersTable)
            .where(eq(usersTable.id, claims.sub))

        return {
            id: user[0].id,
            name: user[0].name,
            email: user[0].email,
        }
    })