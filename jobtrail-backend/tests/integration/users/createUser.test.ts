import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { createTestApp } from "../../helpers/app"
import { removeAll } from "../../helpers/db"
import { StatusCodes } from "http-status-codes"


const app = createTestApp()

const TEST_USER = {
    email: "testuser@test.com",
    name: "Integration Test User",
    password: "test-password-123",
}

const { email, name, password } = TEST_USER

beforeAll(async() => {
    await removeAll()
})

afterAll(async() => {
    // await removeUser(TEST_USER.email)
    await removeAll()
})

describe("POST /api/users", () => {
    it("should create user when input is valid", async() => {
        const response = await app.handle(
            new Request("http://localhost/api/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    name,
                    password
                })
            })
        )

        console.log(response)

        expect(response.status).toBe(StatusCodes.CREATED)
    })

    it("should throw 409 CONFLICT when a user already exists with the given email", async() => {
        await app.handle(
            new Request("http://localhost/api/users",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name, 
                    email, 
                    password
                })
            })
        )

        const response = await app.handle(
            new Request("http://localhost/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
        )

        expect(response.status).toBe(StatusCodes.CONFLICT)
    })
})