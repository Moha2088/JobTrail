import "../../mocks/mockedR2"
import { describe, expect, it } from "bun:test"
import { uploadFile } from "../../../src/utils/r2"


const params = {
    buffer: new ArrayBuffer(),
    name: "testFile.jpg",
    applicationId: "99",
}

describe("uploadFile.ts", () => {
    it("returns correct key format when file is valid", async() => {
        const { key } = await uploadFile(params)
        const { applicationId, name } = params
        const fileName = name.substring(0, name.lastIndexOf("."))

        expect(key).toBe(`${applicationId}-${fileName}`)
    })
})