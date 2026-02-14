import { useQuery } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/elysiaApi"


export function useApplication(applicationId: number) {
    return useQuery({
        queryKey: ["applications", applicationId],
        queryFn: async() => {
            const { data } = await elysiaApi.api.applications({ id: applicationId }).get()
            return data
        }
    })
}