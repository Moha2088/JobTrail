import { t } from "elysia"

export const createUserSchema = {
    body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String()
    })
}

export const getUserSchema = {
    params: t.Object({
        id: t.Number()
    })
}

export const putUserSchema = {
    params: t.Object({
        id: t.Number()
    }),

    body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String()
    })
}

export const deleteUserSchema = {
    params: t.Object({
        id: t.Number()
    })
}