import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/apiClients"
import { getSession } from "../session/getSession"

type PutApplication = Omit<PostApplication, "id">

export function usePutApplication(applicationId: number): UseMutationResult<void, Error, PutApplication> {
    return useMutation({
        meta: {
            errorMessage: "Failed to update application. Please try again.",
            successMessage: "Application updated successfully!",
        },
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            const session = await getSession()            
            await elysiaApi.api.applications({ id: applicationId }).patch(variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        },
    })
}