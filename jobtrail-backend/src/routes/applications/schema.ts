import { t } from "elysia"
import { ApplicationStatus } from "../../db/schema"
import { param } from "drizzle-orm"

export const postApplicationSchema = {
    body: t.Object({
        companyName: t.String(),
        email: t.String(),
        applicationStatus: t.String(),
        position: t.String(),
        content: t.String()
    })
}

export const getApplicationSchema = {
    params: t.Object({
        id: t.Number()
    })
}

export const getApplicationsSchema = {
    query: t.Object({
        pending: t.Optional(t.Boolean())
    })
}

export const putApplicationSchema = {
    params: t.Object({
        id: t.Number()
    }),
    
    body: t.Object({
        companyName: t.String(),
        email: t.String(),
        applicationStatus: t.String(),
        position: t.String(),
        content: t.String()
    })
}

export const deleteApplicationsSchema = {
    params: t.Object({
        id: t.Number()
    })
}