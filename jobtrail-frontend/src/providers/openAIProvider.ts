import { createOpenAI } from "@ai-sdk/openai"


export const openAIClient = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY
})