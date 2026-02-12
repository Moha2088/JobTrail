import Elysia from "elysia";
import { loginSchema } from "./schema";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { jwt } from "@elysiajs/jwt"


export const authRouter = new Elysia({ prefix :"/auth" })
    .post("/login", async({ jwt, body, set, cookie: { auth}}) => {
        const { email, password } = body

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

       const value =  await jwt.sign({
            sub: result[0].id
        })

        auth.set({
            value,
            httpOnly: true,
            maxAge: 3600
        })
        
        return value

    }, loginSchema)

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