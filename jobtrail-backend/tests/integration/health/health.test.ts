import { describe, expect, it } from "bun:test"
import { createTestApp } from "../../helpers/app"
import { StatusCodes } from "http-status-codes"

const app = await createTestApp()

describe("GET /api/health", () => {
    it("should return 200 OK with UP status when database is healthy", async() => {
        const response = await app.handle(
            new Request("http://localhost/api/health", {
                method: "GET"
            })
        )

        expect(response.status).toBe(StatusCodes.OK)

        const body = await response.json()

        expect(body).toEqual({
            services: {
                postgres: "UP"
            }
        })       
    })
})