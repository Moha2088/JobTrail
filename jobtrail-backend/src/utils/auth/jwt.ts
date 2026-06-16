import jwt from "@elysiajs/jwt"
import Elysia from "elysia"

export const jwtConfig = new Elysia()
    .use(
        jwt({
            name: "jwt",
            secret: Bun.env.JWT_SECRET!,
            exp: "1h"
        })
    )