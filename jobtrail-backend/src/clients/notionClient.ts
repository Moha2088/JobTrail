import { Client } from "@notionhq/client";

export const notionClient = new Client({
    auth: Bun.env.NOTION_INTEGRATION_SECRET
})