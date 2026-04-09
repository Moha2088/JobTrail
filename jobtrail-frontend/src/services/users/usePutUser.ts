import { elysiaApi } from "@/app/api/apiClients"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PutUser } from "./types"
import { getSession } from "../session/getSession"


export function usePutUser(userId: number): UseMutationResult<void, Error, PutUser> {
    return useMutation({
        mutationKey: ["users", userId],
        mutationFn: async(variables) => {
            const session = await getSession()
            await elysiaApi.api.users({ id: userId }).put(variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}