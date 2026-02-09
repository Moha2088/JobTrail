import { t } from "elysia"
import { ApplicationStatus } from "../../db/schema"
import { param } from "drizzle-orm"

export const postApplicationSchema = {
    body: t.Object({
        companyName: t.String(),
        email: t.String(),
        applicationStatus: t.String(),
    })
}

export const getApplicationSchema = {
    params: t.Object({
        id: t.Number()
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
    })
}