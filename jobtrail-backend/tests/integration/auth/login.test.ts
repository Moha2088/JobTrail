import { describe, it, expect, beforeAll, afterAll } from "bun:test"
import { createTestApp } from "../../helpers/app"
import { createTestUser, removeUser } from "../../helpers/db"

const app = createTestApp()

const TEST_USER = {
    email: "testuser@test.com",
    name: "Integration Test User",
    password: "test-password-123",
}

beforeAll(async () => {
    await removeUser(TEST_USER.email)
    await createTestUser(TEST_USER.email, TEST_USER.name, TEST_USER.password)
})

afterAll(async () => {
    await removeUser(TEST_USER.email)
})

describe("POST /api/auth/login", () => {
    it("should return 200 with an accessToken when credentials are valid", async () => {
        const response = await app.handle(
            new Request("http://localhost/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: TEST_USER.email,
                    password: TEST_USER.password,
                }),
            }),
        )

        expect(response.status).toBe(200)
        const body = await response.json()
        expect(body).toHaveProperty("accessToken")
        expect(typeof body.accessToken).toBe("string")
    })

    it("should return 401 when email does not exist", async () => {
        const response = await app.handle(
            new Request("http://localhost/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "nonexistent@jobtrail.com",
                    password: "does-not-matter",
                }),
            }),
        )

        expect(response.status).toBe(401)
    })

    it("should return 401 when password is wrong", async () => {
        const response = await app.handle(
            new Request("http://localhost/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: TEST_USER.email,
                    password: "wrong-password",
                }),
            }),
        )

        expect(response.status).toBe(401)
    })
})
