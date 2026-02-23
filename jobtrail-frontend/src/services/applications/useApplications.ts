import { useQuery } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/elysiaApi"


export function useApplications() {    
    return useQuery({
        queryKey: ["applications"],
        queryFn: async() => {
            const { data }  = await elysiaApi.api.applications.get()
            return data
        }
    })
}