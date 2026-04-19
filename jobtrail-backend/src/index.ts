import { Elysia } from "elysia";
import { applicationRouter, userRouter } from "./routes";
import { authRouter } from "./routes/auth/route";
import openapi from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors"
import { jwtConfig } from "./utils/auth/jwt";
import { handleNotFoundError } from "./handlers/handleNotFound"
import "./messaging/eventhandlers/applications/jobHandlers"
import { logger } from "./logger";

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
    .use(handleNotFoundError)
    .group("/api", (app) => app
        .use(jwtConfig)
        .use(applicationRouter)
        .use(userRouter)
        .use(authRouter)
    )
    .listen(3003);

logger.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


export type App = typeof app