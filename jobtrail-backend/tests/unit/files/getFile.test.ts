import "../../mocks/mockedR2"
import "../../mocks/mockedSignedUrl"
import { getFile } from "../../../src/utils/r2"
import { describe, expect, it } from "bun:test"


describe("getFile.ts", () => {
    it("should throw error when key is missing", async() => {
        const key = ""
        await expect(getFile({ key })).rejects.toThrowError("Key is required")
    })


    it("should return signedUrl when key is set", async() => {
        const key = "testFile"
        const signedUrl = await getFile({ key })

        expect(signedUrl).toBe("https://mock-signed-url.com")
    })
})