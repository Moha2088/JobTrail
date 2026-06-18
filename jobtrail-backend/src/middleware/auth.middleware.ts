import Elysia from "elysia"
import { getApplication } from "../utils/applications"
import { getClaims } from "../utils/auth/getClaims"


export const authMiddleware = new Elysia({ name: "auth-middleware" })
    .onBeforeHandle(async({ set, params, headers: { authorization } }) => {
        console.log("After get applications")
    
        const applicationId = Number(params.id)
        const application = await getApplication(applicationId)
        const claims = await getClaims(authorization!)

        if(claims.sub != application.userId) {
            set.status = 401
            return "Unauthorized"
        }
    })
