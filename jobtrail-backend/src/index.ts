import { Elysia } from "elysia";
import { applicationRouter, userRouter } from "./routes";
import { authRouter } from "./routes/auth/route";
import openapi from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors"
import { jwtConfig } from "./utils/auth/jwt";
import { handleNotFoundError } from "./handlers/handleNotFound"

const app = new Elysia()
    .use(cors({
        origin: "http://localhost:3000",
        credentials: true,
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

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


export type App = typeof app