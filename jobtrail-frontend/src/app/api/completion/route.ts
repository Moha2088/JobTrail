import { NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"
import { openAIClient } from "@/providers/openAIProvider"
import { cookies, headers } from "next/headers"
import { checkRateLimit, opts } from "@/clients/redis"
import axios, { HttpStatusCode } from "axios"
import { decodeJwt } from "jose"
import { Provider } from "@/app/applications/[applicationId]/page"
import { anthropicClient } from "@/providers/anthropicProvider"
import { RateLimiterRes } from "rate-limiter-flexible"

async function getRateLimitHeaders(remainingPoints: string, points: string, reset: string) {
    const rateLimitHeaders: Record<string, string> = {
        "X-RateLimit-Remaining": remainingPoints,
        "X-RateLimit-Limit": points,
        "X-RateLimit-Reset": reset,
        "X-RateLimit-FOO": "BAR"
    }

    return rateLimitHeaders
}


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

    try {
        const { remainingPoints, limit, reset } = await checkRateLimit(sub)

        console.log("Rate limit check passed for user with id: " + sub)

        const result = streamText({
            model: currentProvider as Provider == "openai" ? openAIClient("gpt-5.2-chat-latest") : anthropicClient("claude-opus-4-6"),
            prompt: prompt,
        })

        const headers = await getRateLimitHeaders(remainingPoints.toString(), limit.toString(), reset)
        const streamResponse = result.toTextStreamResponse()
        Object.entries(headers).forEach(([k,v]) => streamResponse.headers.set(k, v))
        return streamResponse
    }

    catch(error) {
        if(error as RateLimiterRes) {
            console.log("Logging error!")
            console.log(error)
            const headers = await getRateLimitHeaders(error.remainingPoints.toString(), opts.points.toString(), new Date(Math.ceil(Date.now() + error.msBeforeNext) / 1000).toLocaleString())
            return NextResponse.json(`Rate limit check failed for user with id: ` + sub, { status: HttpStatusCode.InternalServerError, headers: headers })   
        }

        else {
            return new Response(error)
        }
    }
}