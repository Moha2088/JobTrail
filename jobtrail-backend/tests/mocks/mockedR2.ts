import { mock } from "bun:test"

mock.module("../../src/clients/r2", () => ({
    r2: { send: mock(() => Promise.resolve({})) },
    bunClient: { exists: mock(() => Promise.resolve(true)) }
}))