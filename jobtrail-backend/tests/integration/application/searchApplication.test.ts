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

describe("GET /api/applications/search", () => {
    it("should return 200 OK when applications match the search string", async() => {
        const { id, accessToken } = await createTestUser(email, name, password)
        const application = {
            ...APPLICATION,
            userId: id
        }

        const { id: applicationId } = await createTestApplication(application)

        const searchString = "Content"

        const response = await app.handle(
            new Request(`http://localhost/api/applications/search?q=${searchString}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.OK)

        const body = await response.json()

        expect(body).toHaveLength(1)

        expect(body[0]).toEqual({
            Id: applicationId,
            CompanyName: APPLICATION.companyName,
            Email: APPLICATION.email,
            ApplicationStatus: APPLICATION.applicationStatus,
            Position: APPLICATION.position,
            CreatedAt: expect.any(String),
            Content: APPLICATION.content,
            Key: null,
            UserId: id
        })
    })

    it("should return 404 NOT FOUND when applications doesn't match the search string", async() => {
        const { id, accessToken } = await createTestUser(email, name, password)
        
        const application = {
            ...APPLICATION,
            userId: id
        }

        await createTestApplication(application)

        const searchString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"

        const response = await app.handle(
            new Request(`http://localhost/api/applications/search?q=${searchString}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        )

        expect(response.status).toBe(StatusCodes.NOT_FOUND)
    })
})