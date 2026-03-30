import { t } from "elysia"

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

// Files
export const getFileSchema = {
    params: t.Object({
        key: t.String()
    })
}

export const deleteFileSchema = {
    params: t.Object({
        id: t.Number(),
        key: t.String()
    })
}