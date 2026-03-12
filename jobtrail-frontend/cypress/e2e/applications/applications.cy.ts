import { appUrl } from "../../fixtures/constants"
import { SignJWT } from "jose"


describe("Applications page", () => {
    it("should redirect to login page if user is not authenticated", () => {
        cy.visit(`${appUrl}/applications`)
        cy.url().should("include", "/login")
        cy.get("h1").contains("Login").should("be.visible")
    })

    it("should redirect to applications page if user is authenticated", async() => {
        const sessionToken = await new SignJWT({
            sub: Math.floor(Math.random() * 1000).toString(),
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .sign(new TextEncoder().encode("my_secret_session_token_secret"))

        cy.setCookie("session", sessionToken)

        cy.visit(`${appUrl}/login`)
        cy.url().should("include", "/applications")

        cy.clearCookie("session")
    })

    it("should open create application dialog when create application button is clicked", () => {
        cy.get("button").contains("Create").click()
        cy.get("header").contains("Create Application").should("be.visible")
    })
})