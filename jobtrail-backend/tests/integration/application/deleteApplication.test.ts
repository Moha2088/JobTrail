import { afterAll, afterEach, beforeAll, describe, expect, it } from "bun:test"
import { createTestApp } from "../../helpers/app"
import { createTestApplication, createTestUser, getTestUser, removeAll } from "../../helpers/db"
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

describe("DELETE /api/applications", () => {
    it("should return 204 NO CONTENT when deleted", async() => {
        const { id, accessToken } = await createTestUser(email, name, password)

        const application = {
            ...APPLICATION, 
            userId: id
        }

        await createTestApplication(application)

        const createdApplication = (await getTestUser({ id })).applications[0]

        const response = await app.handle(
            new Request(`http://localhost/api/applications/${createdApplication?.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.NO_CONTENT)

        const applications = (await getTestUser({ id })).applications
        expect(applications[0]).toBeNull()
    })

    it("should return 404 NOT FOUND when application doesnt exist", async() => {
        const user = await createTestUser(email, name, password)

        const response = await app.handle(
            new Request("http://localhost/api/applications/10", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.NOT_FOUND)
    })
})