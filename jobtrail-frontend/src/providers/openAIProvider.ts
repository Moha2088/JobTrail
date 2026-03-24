import { createOpenAI } from "@ai-sdk/openai"


export const openAIClient = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export const createPrompt = (content: string) => {
    return "Rewrite and optimize the following content for a job application, in terms of grammar and in structure. " +
        "Make it more appealing and professional: " + content
}