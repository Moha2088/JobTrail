import { createAnthropic } from "@ai-sdk/anthropic"

export const anthropicClient = createAnthropic({
    apiKey: process.env.CLAUDE_API_KEY!
})