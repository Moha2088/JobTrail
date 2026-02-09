import { t } from "elysia"
import { ApplicationStatus } from "../../db/schema"

export const createApplicationSchema = {
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