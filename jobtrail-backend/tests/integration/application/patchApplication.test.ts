import { afterEach, beforeAll, describe, expect, it } from "bun:test"
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

describe("PATCH /api/applications/:id", () => {
    it("should update when input is valid", async() => {
        const { id, accessToken } = await createTestUser(email, name, password)

        const application = {
            ...APPLICATION,
            userId: id
        }

        const { id: applicationId } = await createTestApplication(application)

        const updatedApplication = {
            ...APPLICATION,
            applicationStatus: "ACCEPTED"
        }

        const response = await app.handle(
            new Request(`http://localhost/api/applications/${applicationId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedApplication)

            })
        )

        expect(response.status).toBe(StatusCodes.NO_CONTENT)
    
        const { applications } = await getTestUser({ id })

        expect(applications[0]).toEqual({
            id: applicationId,
            companyName: updatedApplication.companyName,
            email: updatedApplication.email,
            position: updatedApplication.position,
            content: updatedApplication.content,
            createdAt: expect.any(Date),
            applicationStatus: updatedApplication.applicationStatus,
            key: null,
            userId: id
        })
    })
})