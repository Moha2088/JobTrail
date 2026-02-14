import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { Application } from "./types";
import { elysiaApi } from "@/app/api/elysiaApi";

type Options = UseQueryOptions<Application>

export function useApplication(applicationId: number, options: Options): UseQueryResult {
    return useQuery({
        queryKey: ["applications", applicationId],
        queryFn: async() => {
            const { data } = await elysiaApi.api.applications({ id: applicationId}).get()
            return data
        }
    })
}