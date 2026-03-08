import { appUrl } from "../../fixtures/constants"


describe("Applications page", () => {
    it("should redirect to login page if user is not authenticated", () => {
        cy.visit(`${appUrl}/applications`)
        cy.url().should("include", "/login")
        cy.get("h1").contains("Login").should("be.visible")
    })
})