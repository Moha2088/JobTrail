

import { jwtVerify } from "jose"
import { SessionData } from "@/app/api/login/types"

export async function verifySession(sessionToken: string): Promise<SessionData> {
    const session = await jwtVerify(sessionToken, new TextEncoder().encode("my_secret_session_token_secret"))

    console.log("Session verified successfully")

    const { sub, exp, name, email, accessToken } = session.payload

    return {
        userId: Number(sub),
        expiresAt: exp!,
        name: name as string,
        email: email as string,
        accessToken: accessToken as string

    }
}