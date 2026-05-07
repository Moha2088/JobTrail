import { elysiaApi } from "@/app/api/apiClients"
import { getSession } from "@/services/session/getSession"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export function useGetFile(key: string) {
    return useQuery({
        enabled: () => key != null,
        queryKey: ["files", key],
        queryFn: async() => {
            const session = await getSession()

            const { data } = await elysiaApi.api.applications.resume({ key: key }).get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            if (typeof data === "string") {
                return data
            }
        }
    })
}