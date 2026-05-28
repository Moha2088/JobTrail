import { Client } from "@notionhq/client";

export const notionClient = new Client({
    auth: (() => {
        const integrationSecret = Bun.env.NOTION_INTEGRATION_SECRET
        if(!integrationSecret) {
            throw new Error("Integration secret not found")
        }

        return integrationSecret
    })()
})