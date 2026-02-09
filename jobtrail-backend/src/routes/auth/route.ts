import Elysia from "elysia";
import { loginSchema } from "./schema";


export const authRouter = new Elysia({ prefix :"/auth" })
    .post("/login", async({body, set}) => {
        const { email, password } = body
    }, loginSchema)