import { SignJWT } from "jose"

export function createAndSetSession() {
    return cy.then(async() => {
        const sessionToken = await new SignJWT({
            sub: Math.floor(Math.random() * 1000).toString(),
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .sign(new TextEncoder().encode("my_secret_session_token_secret"))

        cy.setCookie("session", sessionToken)
    })
}