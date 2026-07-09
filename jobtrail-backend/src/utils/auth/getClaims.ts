import { decodeJwt } from "jose"


export async function getClaims(accessToken: string) {
    const claims = decodeJwt(accessToken)

    return {
        sub: Number(claims.sub),
        name: claims.name as string,
        email: claims.email as string,
        exp: claims.exp!,
        iat: claims.iat!,
    }
}