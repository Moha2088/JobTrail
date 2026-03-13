import { appUrl } from "../../fixtures/constants"
import { SignJWT } from "jose"
import { createAndSetSession } from "../../fixtures/createAndSetSession"


describe("Applications page", () => {
    it("should redirect to login page if user is not authenticated", () => {
        cy.visit(`${appUrl}/applications`)
        cy.url().should("include", "/login")
        cy.get("h1").contains("Login").should("be.visible")
    })

    it("should redirect to applications page if user is authenticated", async() => {
        await createAndSetSession()

        cy.visit(`${appUrl}/login`)
        cy.url().should("include", "/applications")

        cy.clearCookie("session")
    })

    it("should open Create Application dialog when button is clicked!", async() => {
        await createAndSetSession()
        cy.visit(`${appUrl}/applications`)
        cy.contains("Create").click()
        cy.contains("Create Application").should("be.visible")
    })

    it("should disable Dialog button when fields are empty", async() => {
        await createAndSetSession()
        cy.visit(`${appUrl}/applications`)
        cy.contains("Create").click()
        cy.contains("Create Application").should("be.visible")
        cy.get("button").contains("Save").should("be.disabled")
    })
})