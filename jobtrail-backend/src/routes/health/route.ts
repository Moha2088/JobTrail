import Elysia from "elysia";
import { db } from "../../db/db";
import { sql } from "drizzle-orm";


type Status = "UP" | "DOWN"

interface HealthCheckResponse {
    services: {
        postgres: Status
    }
}


const HEALTHCHECK_TIMEOUT_MS = 5000

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("Healthcheck timeout")), ms)

        promise
        .then((value) => {
            clearTimeout(timer)
            resolve(value)
        })
        .catch((err) => {
            clearTimeout(timer)
            reject(err)
        })
    })
}

export const healthRouter = new Elysia()
    .get("/health", async({ set }): Promise<HealthCheckResponse> =>  {
    
        let postgresStatus: Status = "UP"
        
        try {
            await withTimeout(db.execute(sql`SELECT 1`), HEALTHCHECK_TIMEOUT_MS)
        }

        catch {
            postgresStatus = "DOWN"
            set.status = 503
        }

        return {
            services: {
                postgres: postgresStatus
            }
        }
    })