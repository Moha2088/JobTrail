import { Elysia } from "elysia"
import { authRouter } from "../../src/routes/auth/route"
import { jwtConfig } from "../../src/utils/auth/jwt"
import { handleNotFoundMiddleware } from "../../src/middleware/handleNotFound.middleware"
import { applicationRouter, userRouter } from "../../src/routes"
import { healthRouter } from "../../src/routes/health/route"

export function createTestApp() {
    return new Elysia()
        .use(handleNotFoundMiddleware)
        .group("/api", (app) => app
            .use(jwtConfig)
            .use(authRouter)
            .use(userRouter)
            .use(healthRouter)
            .use(applicationRouter)
        )
}
