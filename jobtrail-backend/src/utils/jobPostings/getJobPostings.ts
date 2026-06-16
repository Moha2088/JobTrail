import { notionClient } from "../../clients/notionClient"

export async function getJobPostings(page_limit?: number) {
    const response = await notionClient.dataSources.query({
        data_source_id: Bun.env.NOTION_DATA_SOURCE_ID!,
        page_size: page_limit ?? 10
    })
    
    return response.results
}