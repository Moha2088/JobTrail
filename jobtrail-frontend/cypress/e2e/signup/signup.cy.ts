
interface SignupData {
    email: string
    name: string
    password: string
}

describe("Signup Page", () => {
    let signupData: SignupData

    beforeEach(() => {
        cy.fixture("../fixtures/signupData.json").then((data) => signupData = data)
        cy.visit("http://localhost:3000/signup")
    })

    it("should display error messages when fields are empty", () => {
        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Email is required!").should("be.visible")
        cy.get('p').contains("Name is required!").should("be.visible")
        cy.get('p').contains("Password is required!").should("be.visible")
        cy.get('p').contains("Password must be confirmed!").should("be.visible")
    })
})