import { IRateLimiterOptions, IRateLimiterStoreOptions, RateLimiterMemory } from "rate-limiter-flexible"
import Redis from "ioredis"
import { isProduction } from "@/app/api/apiClients"

interface RateLimitResponse {
    remainingPoints: number
    limit: number
    reset: string
}


const storeClient = new Redis(isProduction ? process.env.RAILWAY_REDIS_PUBLIC_URL! : "127.0.0.1")

export const opts: IRateLimiterOptions & IRateLimiterStoreOptions = {
    points: 10,
    duration: 3600,
    storeClient
}

const rateLimiter = new RateLimiterMemory(opts)

export async function checkRateLimit(userId: string): Promise<RateLimitResponse> {
    const { remainingPoints, msBeforeNext } = await rateLimiter.consume(userId)

    console.log("Rate limit check passed for user with id: " + userId)
    console.log("Ratelimit Payload")
    console.log(remainingPoints, msBeforeNext)

    return {
        remainingPoints,
        limit: opts.points,
        reset: new Date(Math.ceil(Date.now() + msBeforeNext) / 1000).toLocaleDateString()
    }
}