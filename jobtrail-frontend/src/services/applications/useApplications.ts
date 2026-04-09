import { useQuery } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/apiClients"
import axios from "axios"
import { getSession } from "@/services/session/getSession"

axios.defaults.withCredentials = true

export function useApplications() {
    return useQuery({
        queryKey: ["applications"],
        queryFn: async() => {
            const session = await getSession()

            const { data }  = await elysiaApi.api.applications.get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
            return data
        }
    })
}