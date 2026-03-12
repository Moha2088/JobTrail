import { useQuery } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/apiClients"
import axios from "axios"
import { ApplicationData } from "./types"
import { getSession } from "@/services/session/getSession"

axios.defaults.withCredentials = true

export function useApplications() {
    return useQuery({
        queryKey: ["applications"],
        queryFn: async() => {
            const session = await getSession()

            const { data }  = await axios.get<ApplicationData>("http://localhost:3003/api/applications", {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
            console.log(data)
            return data
        }
    })
}