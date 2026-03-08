import { SignJWT } from "jose"
import { SessionData } from "@/app/api/login/types"


export async function signSession(sessionData: SessionData) {
    const { userId, expiresAt } = sessionData

    return await new SignJWT({
        sub: userId,
        exp: expiresAt,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(new TextEncoder().encode("my_secret_session_token_secret"))
}