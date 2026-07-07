import { describe, expect, it } from "bun:test"
import { getClaims } from "../../../src/utils/auth/getClaims"
import { createAccessToken } from "../../helpers/createAccessToken"

const TEST_USER = {
    email: "testuser@test.com",
    name: "Integration Test User",
}

const { email, name } = TEST_USER

describe("getClaims.ts", () => {
    it("should return claims when access token is valid", async() => {
        const { accessToken } = await createAccessToken({ email, name, sub: "1" })
        const claims = await getClaims(accessToken)

        expect(claims).toEqual({
            sub: 1,
            name: "Integration Test User",
            email: "testuser@test.com",
            exp: expect.any(Number),
            iat: expect.any(Number)
        })

        expect(claims.exp).toBeGreaterThan(claims.iat)
    })
})