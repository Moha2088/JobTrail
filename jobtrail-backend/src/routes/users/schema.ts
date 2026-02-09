import { t } from "elysia"

export const createUserSchema = {
    body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String()
    })
}