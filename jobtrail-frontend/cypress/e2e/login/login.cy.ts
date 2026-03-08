import { appUrl } from "../../fixtures/constants"
import { SignupData } from "../signup/signup.cy"
import { SignJWT } from "jose"

type LoginData = Omit<SignupData, "name">


describe('Login page', () => {
    let loginData: LoginData
    let sessionSecret: string

    beforeEach(() => {
        cy.fixture("../fixtures/loginData.json").then((data) => loginData = data)
        cy.env(["SESSION_SECRET"]).then(({ value }) => sessionSecret = value)
    })


    it("should display error message when password is too short", () => {
        cy.visit(`${appUrl}/login`)
        cy.get('h1').contains("Login").should("be.visible")

        cy.get('input[placeholder="Enter your email"]').type(loginData.email)
        cy.get('input[placeholder="Enter your password"]').type(loginData.password)
        
        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Password must be atleast 8 characters").should("be.visible")
    })

    it ("should display error message when email is invalid", () => {
        cy.visit(`${appUrl}/login`)
        cy.get('h1').contains("Login").should("be.visible")

        cy.get('input[placeholder="Enter your email"]').type("testexample.com")
        cy.get('input[placeholder="Enter your password"]').type("test1234")

        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Email is not valid!").should("be.visible")
    })

    it("should display error message when email and password fields are empty", () => {
        cy.visit(`${appUrl}/login`)
        cy.get('h1').contains("Login").should("be.visible")

        cy.get('button[type="submit"]').click()

        cy.get('p').contains("Email is required!").should("be.visible")
        cy.get('p').contains("Password is required!").should("be.visible")
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
})