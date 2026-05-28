import Elysia from "elysia";
import { getClaims } from "../../utils/auth/getClaims";
import { getJobPostings } from "../../utils/jobPostings/getJobPostings";


export const jobPostingRouter = new Elysia({ prefix: "/jobPostings" })
.get("/", async({set, headers: { authorization }}) => {
    if(!authorization) {
        set.status = 401
        return
    }

    const claims = await getClaims(authorization)

    if(!claims) {
        set.status = 401
        return
    }

    const jobPostings = await getJobPostings()

    return [...new Set(jobPostings)]
})