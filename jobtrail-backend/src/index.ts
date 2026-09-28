import { Elysia } from "elysia"
import { applicationRouter, userRouter } from "./routes"
import { authRouter } from "./routes/auth/route"
import openapi from "@elysiajs/openapi"
import { cors } from "@elysiajs/cors"
import { jwtConfig } from "./utils/auth/jwt"
import { healthRouter } from "./routes/health/route"
import { handleNotFoundMiddleware } from "./middleware/handleNotFound.middleware"
import { jobPostingRouter } from "./routes/jobPostings/route"
import { workbench } from "@getworkbench/elysia"
import { usersQueue } from "./messaging/queue"
import { shutdownTelemetry } from "./instrumentation"
import { logger } from "./logger"


const app = new Elysia()
    .use(cors({
        origin: [
            Bun.env.FRONTEND_URL! || "http://localhost:3000",
            Bun.env.PROD_FRONTEND_URL!
        ],
        credentials: true
    }))
    .use(openapi({
        path: "/docs" }
    ))
    .use(handleNotFoundMiddleware)
    .mount("/jobs", workbench({
        queues: [usersQueue],
        basePath: "/jobs",
        auth: {
            username: Bun.env.BULL_USERNAME!,
            password: Bun.env.BULL_PASSWORD!
        },
    }))
    .group("/api", (app) => app
        .use(jwtConfig)
        .use(healthRouter)
        .use(applicationRouter)
        .use(userRouter)
        .use(authRouter)
        .use(jobPostingRouter)
    )
    .listen(3003)

logger.info(
    `🦊 Elysia is running!`, {
        hostName: app.server?.hostname,
        port: app.server?.port
    }
)

logger.info("Environment: " + Bun.env.NODE_ENV)

let isShuttingDown = false

async function gracefulShutdown(signal: string) {
    if (isShuttingDown) return
    isShuttingDown = true

    logger.info(`Received shutdown signal. Shutting down`, {
        signal
    })

    await app.stop()
    await shutdownTelemetry()

    process.exit(0)
}

process.once("SIGTERM", () => void gracefulShutdown("SIGTERM"))
process.once("SIGINT", () => void gracefulShutdown("SIGINT"))


export type App = typeof app
