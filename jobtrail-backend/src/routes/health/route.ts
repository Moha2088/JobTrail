import Elysia from "elysia";
import { db } from "../../db/db";
import { sql } from "drizzle-orm";


type Status = "UP" | "DOWN"

interface HealthCheckResponse {
    services: {
        postgres: Status
    }
}


export const healthRouter = new Elysia()
    .get("/health", async({ set }): Promise<HealthCheckResponse> =>  {
    
        let postgresStatus: Status = "UP"
        
        try {
            await db.execute(sql`SELECT 1`)
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