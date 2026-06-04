import { Elysia } from "elysia";
import { applicationRouter, userRouter } from "./routes";
import { authRouter } from "./routes/auth/route";
import openapi from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors"
import { jwtConfig } from "./utils/auth/jwt";
import { logger } from "./logger";
import { healthRouter } from "./routes/health/route";
import { handleNotFoundMiddleware } from "./middleware/handleNotFound.middleware";
import { jobPostingRouter } from "./routes/jobPostings/route";

const app = new Elysia()
    .use(cors({
        origin: [
            Bun.env.FRONTEND_URL! || "http://localhost:3000",
            Bun.env.PROD_FRONTEND_URL!
        ],
        credentials: true
    }))
    .use(openapi({
        path: "/docs"}
    ))
    .use(handleNotFoundMiddleware)
    .group("/api", (app) => app
        .use(jwtConfig)
        .use(healthRouter)
        .use(applicationRouter)
        .use(userRouter)
        .use(authRouter)
        .use(jobPostingRouter)
    )
    .listen(3003);

logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

logger.info("Environment: " + Bun.env.NODE_ENV)


export type App = typeof app