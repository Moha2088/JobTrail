
interface LoginData {
    email: string
    password: string
}

describe('Login page', () => {
    let loginData: LoginData

    beforeEach(() => {
        cy.fixture("../fixtures/loginData.json").then((data) => loginData = data)
        cy.visit("/login")
    })


    it("should display error message when password is too short", () => {
        cy.get('input[placeholder="Enter your email"]').type(loginData.email)
        cy.get('input[placeholder="Enter your password"]').type(loginData.password)
        
        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Password must be atleast 8 characters").should("be.visible")
    })

    it ("should display error message when email is invalid", () => {
        cy.get('input[placeholder="Enter your email"]').type("testexample.com")
        cy.get('input[placeholder="Enter your password"]').type("test1234")

        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Email is not valid!").should("be.visible")
    })

    it("should display error message when email and password fields are empty", () => {
        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Email is required!").should("be.visible")
        cy.get('p').contains("Password is required!").should("be.visible")
    })
})