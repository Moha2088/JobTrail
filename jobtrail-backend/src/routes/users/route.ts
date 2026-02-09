import Elysia from "elysia";
import { createUserSchema } from "./schema";


export const userRouter = new Elysia({ prefix: "/users" })
    .post("/", async({body}) => {
        const { name, email, password } = body
        
    }, createUserSchema)