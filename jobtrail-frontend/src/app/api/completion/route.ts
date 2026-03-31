import { NextRequest } from "next/server"
import { streamText } from "ai"
import { openAIClient } from "@/providers/openAIProvider"
import { cookies } from "next/headers"
import { checkRateLimit } from "@/clients/redis"
import { HttpStatusCode } from "axios"
import { decodeJwt } from "jose"
import { Provider } from "@/app/applications/[applicationId]/page"
import { anthropicClient } from "@/providers/anthropicProvider"


export async function POST(req: NextRequest) {
    const { prompt, currentProvider } = await req.json()

    // const reqHeaders = await headers()
    // const userIp = reqHeaders.get("x-forwarded-for")

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session")

    if(!sessionToken) {
        return new Response("Unauthorized", {
            status: HttpStatusCode.Unauthorized
        })
    }

    const { sub } = decodeJwt(sessionToken.value)

    if(!sub) {
        return new Response("Couldn't read id", {
            status: HttpStatusCode.Unauthorized
        })
    }

    const { success, limit, remaining } = await checkRateLimit(sub)

    if(!success) {
        return new Response(`Up to ${limit} requests can be sent in an hour. Try again at: ${new Date(remaining).toLocaleTimeString()}!`, {
            status: HttpStatusCode.TooManyRequests
        })
    }

    if(success) {
        console.log("Rate limit check passed! for user with id: " )
    }

    const result = streamText({
        model: currentProvider as Provider == "openai" ? openAIClient("gpt-5.2-chat-latest") : anthropicClient("claude-opus-4-6"),
        prompt: prompt,
    })

    return result.toTextStreamResponse()
}