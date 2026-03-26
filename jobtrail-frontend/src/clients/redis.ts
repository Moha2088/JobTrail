import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"


const redis = new Redis({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_TOKEN,
})

export const rateLimiter = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(5, "1 h"),
    analytics: true
})

export async function checkRateLimit(userId: string) {
    const { success, limit, reset } = await rateLimiter.limit(userId)

    return {
        success,
        limit,
        remaining: reset
    }
}