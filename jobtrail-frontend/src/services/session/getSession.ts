"use server"

import { SessionData } from "@/app/api/login/types"
import { cookies } from "next/headers"
import { decodeJwt } from "jose"


export async function getSession() : Promise<SessionData | undefined> {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if(!sessionCookie) {
        console.log("Session cookie not found")
        return
    }

    const decodedToken = decodeJwt(sessionCookie!.value)
    return {
        userId: Number(decodedToken.sub),
        expiresAt: decodedToken.exp as number,
        name: decodedToken.name as string,
        email: decodedToken.email as string,
        accessToken: decodedToken.accessToken as string

    }


}