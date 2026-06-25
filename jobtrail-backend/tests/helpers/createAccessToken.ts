import { SignJWT } from "jose"

interface CreateAccessTokenParams {
    sub: string
    name: string
    email: string
}

export async function createAccessToken(params: CreateAccessTokenParams) {
    const { sub, name, email } = params
    
    const accessToken = await new SignJWT({
        sub,
        name,
        email,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(new TextEncoder().encode(Bun.env.JWT_SECRET!))

    return {
        accessToken
    }
}