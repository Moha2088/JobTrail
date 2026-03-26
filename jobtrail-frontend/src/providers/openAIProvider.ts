import { createOpenAI } from "@ai-sdk/openai"


export const openAIClient = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export const createContentPrompt = (content: string) => {
    return "Rewrite and optimize the following content for a job application, in terms of grammar and in structure. " +
        "Make it more appealing and professional: " + content
}

export const createCompanyRecommendationPromp = (companies: string) => {
    return "Based on the following list of positions, and companies that I have applied to, what other companies should I apply to which falls under the same domain and hires similar roles? Recommend up to 5 companies: " + companies
}