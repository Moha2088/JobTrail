import { mock } from "bun:test"


mock.module("@aws-sdk/s3-request-presigner", () =>({
    getSignedUrl: mock(() => Promise.resolve("https://mock-signed-url.com"))
}))