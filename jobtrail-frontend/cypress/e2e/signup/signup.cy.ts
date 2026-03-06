import { appUrl } from "../../fixtures/constants"

export interface SignupData {
    email: string
    name: string
    password: string
}

describe("Signup Page", () => {
    let signupData: SignupData

    beforeEach(() => {
        cy.fixture("../fixtures/signupData.json").then((data) => signupData = data)
        cy.visit(`${appUrl}/signup`)
        cy.get("h1").contains("Sign Up").should("be.visible")
    })

    it("should display error messages when fields are empty", () => {
        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Name is required!").should("be.visible")
        cy.get('p').contains("Email is required!").should("be.visible")
        cy.get('p').contains("Password is required!").should("be.visible")
        cy.get('p').contains("Password must be confirmed!").should("be.visible")
    })

    // it("should redirect to login page when user has been created", () => {
    //     cy.get('input[placeholder="Enter your name"]').type(signupData.name)
    //     cy.get('input[placeholder="Enter your email"]').type(signupData.email)
    //     cy.get('input[placeholder="Enter your password"]').type(signupData.password)
    //     cy.get('input[placeholder="Confirm password"]').type(signupData.password)

    //     cy.get('button[type="submit"]').click()

    //     cy.url().should("eq", `${appUrl}/applications`)
    // })
})