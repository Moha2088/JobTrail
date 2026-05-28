import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { edenClient } from "@/app/api/apiClients"
import { getSession } from "@/services/session/getSession"


export function usePostApplication(): UseMutationResult<void, Error, PostApplication> {
    return useMutation({
        meta: {
            successMessage: "Application created successfully",
            errorMessage: "Failed to create application"
        },
        mutationKey: ["applications"],
        mutationFn: async (variables) => {
            const session = await getSession()

            await edenClient.api.applications.post(variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}