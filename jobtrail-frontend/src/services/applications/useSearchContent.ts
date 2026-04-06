import { useQuery } from "@tanstack/react-query"
import { getSession } from "../session/getSession"
import axios from "axios"


export function useSearchContent(searchQuery: string) {
    return useQuery({
        queryKey: ["applications", searchQuery],
        queryFn: async() => {
            const session = await getSession()
            const { data } = await axios.get(`http://localhost:3003/api/applications/search?q=${searchQuery}`, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            return data
        }
    })
}