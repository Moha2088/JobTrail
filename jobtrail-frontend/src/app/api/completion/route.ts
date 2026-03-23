import { NextRequest } from "next/server"
import { streamText } from "ai"
import { openAIClient } from "@/providers/openAIProvider"

export async function POST(req: NextRequest) {
    const { prompt } = await req.json()

    const result = streamText({
        model: openAIClient("gpt-5"),
        prompt
    })

    return result.toTextStreamResponse()
}