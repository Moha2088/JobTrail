import { getSession } from "@/services/session/getSession"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export function useGetFile(key: string) {
    return useQuery({
        queryKey: ["file", key],
        queryFn: async() => {
            const session = await getSession()
            const { data } = await axios.get(`http://localhost:3003/api/applications/resume/${key}`, {
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