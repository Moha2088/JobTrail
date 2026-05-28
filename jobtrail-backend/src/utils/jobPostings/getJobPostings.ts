import { notionClient } from "../../clients/notionClient";
import { JobPostingData } from "../../routes/jobPostings/types";

export async function getJobPostings(page_limit?: number) {
    const response = await notionClient.dataSources.query({
        data_source_id: Bun.env.NOTION_DATA_SOURCE_ID!,
        page_size: page_limit ?? 10
    })
    
    return response.results
}