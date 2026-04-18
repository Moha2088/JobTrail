import { treaty } from "@elysiajs/eden"
import { App } from "../../../../jobtrail-backend/src/index"
import axios from "axios"


export const isProduction = process.env.NODE_ENV === "production"

export const elysiaApi = treaty<App>(isProduction ? process.env.PROD_NEXT_BACKEND_URL! : process.env.NEXT_BACKEND_URL!)

export const axiosClient = axios.create({
    baseURL: isProduction ? process.env.PROD_NEXT_BACKEND_URL! : process.env.NEXT_BACKEND_URL!
})