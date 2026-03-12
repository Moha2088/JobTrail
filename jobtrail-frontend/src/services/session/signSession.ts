import { SignJWT } from "jose"
import { SessionData } from "@/app/api/login/types"


export async function signSession(sessionData: SessionData) {
    const { userId, expiresAt, accessToken, name, email } = sessionData

    return await new SignJWT({
        sub: userId.toString(),
        exp: expiresAt,
        name,
        email,
        accessToken
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(new TextEncoder().encode("my_secret_session_token_secret"))
}