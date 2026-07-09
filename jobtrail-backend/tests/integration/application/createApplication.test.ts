import { afterAll, beforeAll, describe, expect, it } from "bun:test"
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

afterAll(async() => {
    await removeAll()
})


describe("POST /api/applications", () => {
    it("should create application when input is valid", async() => {
        const user = await createTestUser(email, name, password)

        const application = {
            ...APPLICATION, 
            userId: user.id
        }

        await createTestApplication(application)

        const response = await app.handle(
            new Request("http://localhost/api/applications", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                },
                body: JSON.stringify(application)
            })
        )

        const applications = (await getTestUser({ id: user.id })).applications

        expect(applications).toHaveLength(1)

        expect(applications[0]).toEqual({
            companyName: APPLICATION.companyName,
            email: APPLICATION.email,
            content: APPLICATION.content,
            id: expect.any(Number),
            key: null,
            position: APPLICATION.position,
            createdAt: expect.any(Date),
            userId: user.id,
            applicationStatus: APPLICATION.applicationStatus
        })
    })
})