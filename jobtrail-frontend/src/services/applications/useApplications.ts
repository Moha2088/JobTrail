import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { Application } from "./types";
import { elysiaApi } from "@/app/api/elysiaApi";


type Options = Partial<UseQueryOptions<Application[]>>


export function useApplications(options: Options = { }){    
    return useQuery({
        queryKey: ["applications"],
        queryFn: async() => {
            const { data }  = await elysiaApi.api.applications.get()
            return data
        }
    }), options
}