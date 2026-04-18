import { treaty } from "@elysiajs/eden"
import { App } from "../../../../jobtrail-backend/src/index"
import axios from "axios"


export const isProduction = process.env.NODE_ENV === "production"

const url = isProduction ? process.env.PROD_NEXT_BACKEND_URL! : process.env.NEXT_BACKEND_URL!

export const elysiaApi = treaty<App>(url)

export const axiosClient = axios.create({
    baseURL: url,
    timeout: 5000,
})