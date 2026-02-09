import { t } from "elysia"

export const loginSchema = {
    body: t.Object({
        email: t.String(),
        password: t.String()
    })
}