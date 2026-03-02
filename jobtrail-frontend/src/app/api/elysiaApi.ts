import { treaty } from "@elysiajs/eden"
import { App } from "../../../../jobtrail-backend/src/index"


export const elysiaApi = treaty<App>(process.env.NEXT_BACKEND_URL!)