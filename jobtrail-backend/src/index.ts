import { Elysia } from "elysia";
import { applicationRouter, userRouter } from "./routes";
import { authRouter } from "./routes/auth/route";
import openapi from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors"
import { jwtConfig } from "./utils/auth/jwt";
import "./messaging/eventhandlers/applications/jobHandlers"
import { logger } from "./logger";
import { healthRouter } from "./routes/health/route";
import { handleNotFoundMiddleware } from "./middleware/handleNotFound.middleware";

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
    )
    .listen(3000);

logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


export type App = typeof app