import { sql } from "drizzle-orm";
import { db } from "../../db/db";


export async function searchContent(query: string, userId: number) {
    const searchResults = await db.execute(sql`
        SELECT * 
        FROM applications
        WHERE to_tsvector('danish', "Content") @@ to_tsquery('danish', ${query})
        AND "UserId" = ${userId}
    `)

    return searchResults.rows
}