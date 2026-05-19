"use client"

import { useQuery, UseQueryResult } from "@tanstack/react-query"
import axios from "axios"
import { SessionData } from "@/app/api/login/types"


export function useSession(): UseQueryResult<SessionData, Error> {
    return useQuery<SessionData>(({
        queryKey: ["session"],
        gcTime : 0,
        refetchOnMount: true,
        queryFn: async() => {
            const { data } = await axios.get("../../api/session")
            return data
        }
    }))
}