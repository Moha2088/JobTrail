import { Elysia } from "elysia";
import "./messaging/eventhandlers/jobHandlers"

const app = new Elysia()
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
