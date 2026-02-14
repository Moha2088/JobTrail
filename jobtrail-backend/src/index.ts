import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt"
import { applicationRouter, userRouter } from "./routes";
import { authRouter } from "./routes/auth/route";
import openapi from "@elysiajs/openapi";
import { cors } from "@elysiajs/cors"

const app = new Elysia()
    .use(
        cors({
            "origin": true,
            "methods": ["POST", "PUT", "GET", "DELETE"],
        })
    )
    .use(openapi({
        path: "/docs"}
    ))
    .group("/api", (app) => app  
        .use(applicationRouter)
        .use(userRouter)
        .use(authRouter)
    )
    .use(
        jwt({
            name: "jwt",
            secret: Bun.env.JWT_SECRET!,
            exp: "1h"
        })
    )
    .listen(3003);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);


export type App = typeof app