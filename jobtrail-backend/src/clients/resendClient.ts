import { Resend } from "resend"

if (!Bun.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not found!")
}

if(!Bun.env.RESEND_FROM) {
    throw new Error("FROM address is missing!")
}


export const resendClient = new Resend(Bun.env.RESEND_API_KEY)