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

export const getApplicationsSchema = {
    query: t.Object({
        page: t.Number({ minimum: 1 }),
        limit: t.Number({ minimum: 5 })
    })
}

export const searchContentSchema = {
    query: t.Object({
        q: t.String()
    })
}

export const patchApplicationSchema = {
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

export const patchApplicationContentSchema = {
    params: t.Object({
        id: t.Number()
    }),

    body: t.Object({
        content: t.String()
    })
}

export const cancelDeletionSchema = {
    params: t.Object({
        id: t.Number()
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