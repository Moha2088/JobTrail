

import { jwtVerify } from "jose"
import { SessionData } from "@/app/api/login/types"

export async function verifySession(sessionToken: string): Promise<SessionData> {
    const session = await jwtVerify(sessionToken, new TextEncoder().encode("my_secret_session_token_secret"))

    console.log("Session verified successfully")

    return {
        userId: session.payload.sub!,
        expiresAt: session.payload.exp!
    }
}