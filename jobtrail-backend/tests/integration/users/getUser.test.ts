import { afterAll, afterEach, beforeAll, describe, expect, it } from "bun:test"
import { createTestApp } from "../../helpers/app"
import { createTestUser, getTestUser, removeAll } from "../../helpers/db"
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


afterEach(async() => {
    // await removeUser(TEST_USER.email)
    await removeAll()
})

describe("GET /api/users/:id", () => {
    it("should return user when user exists", async() => {
        const user = await createTestUser(email, name, password)

        const response = await app.handle(
            new Request(`http://localhost/api/users/${user.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`,
                },
            })
        )

        expect(response.status).toBe(StatusCodes.OK)
    })

    it("should return 404 NOT FOUND when user doesn't exist", async() => {
        const { accessToken } = await createTestUser(email, name, password)

        const response = await await app.handle(
            new Request("http://localhost/api/users/10", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.NOT_FOUND)
    })

    it("should return 401 UNAUTHORIZED with no access token", async() => {
        const user = await createTestUser(email, name, password)

        const response = await app.handle(
            new Request(`http://localhost/api/users/${user.id}`, {
                method: "GET"
            })
        )

        expect(response.status).toBe(StatusCodes.UNAUTHORIZED)
    })

    it("should return 403 FORBIDDEN when user attempts to query another users data", async() => {
        const user = await createTestUser(email, name, password)
        const user2 = await createTestUser("testuser2@test.com", "Integration Test user 2", "test-password123123")
        
        const response = await app.handle(
            new Request(`http://localhost/api/users/${user2.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.FORBIDDEN)

    })
})