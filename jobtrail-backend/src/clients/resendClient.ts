import { Resend } from "resend";


export const resendClient = new Resend(Bun.env.RESEND_API_KEY)