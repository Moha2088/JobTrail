import { afterEach, beforeAll, describe, expect, it } from "bun:test"
import { createTestApp } from "../../helpers/app"
import { createTestApplication, createTestUser, removeAll } from "../../helpers/db"
import { StatusCodes } from "http-status-codes"


const app = createTestApp()

const TEST_USER = {
    email: "testuser@test.com",
    name: "Integration Test User",
    password: "test-password-123",
}

const APPLICATION = {
    companyName: "TestCorp",
    email: "info@testcorp.com",
    applicationStatus: "PENDING",
    position: "Software Engineer",
    content: "Test Content"
}

const { email, name, password } = TEST_USER

beforeAll(async() => {
    await removeAll()
})

afterEach(async() => {
    // await removeUser(TEST_USER.email)
    await removeAll()
})

describe("GET /api/applications/:id", () => {
    it("should return application when application exists", async() => {
        const { id, accessToken } = await createTestUser(email, name, password)

        const application = {
            ...APPLICATION,
            userId: id
        }

        const { id: applicationId } = await createTestApplication(application)

        const response = await app.handle(
            new Request(`http://localhost/api/applications/${applicationId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.OK)
    })

    it("should return 404 NOT FOUND when application doesnt exist", async() => {
        const user = await createTestUser(email, name, password)

        const response = await app.handle(
            new Request("http://localhost/api/applications/10", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.NOT_FOUND)
    })

    it("should return 403 FORBIDDEN when user tries to access another users application", async() => {
        const { id } = await createTestUser(email, name, password)
        const { accessToken } = await createTestUser("testuser2@test.com", "Integration Test user 2", "test-password123123")
        
        const application = {
            ...APPLICATION,
            userId: id
        }

        const { id: applicationId } = await createTestApplication(application)

        const response = await app.handle(
            new Request(`http://localhost/api/applications/${applicationId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.FORBIDDEN)
    })
})