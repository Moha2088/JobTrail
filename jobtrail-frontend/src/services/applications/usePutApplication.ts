import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { edenClient } from "@/app/api/apiClients"
import { getSession } from "../session/getSession"

type PutApplication = Omit<PostApplication, "id" | "pendingDeletion">

export function usePutApplication(applicationId: number): UseMutationResult<void, Error, PutApplication> {
    const queryClient = useQueryClient()

    return useMutation({
        meta: {
            errorMessage: "Failed to update application. Please try again.",
            successMessage: "Application updated successfully!",
        },
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            const session = await getSession()
            await edenClient.api.applications({ id: applicationId }).patch(variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] })
    })
}