import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getSession } from "@/services/session/getSession"
import axios from "axios"
import { edenClient } from "@/app/api/apiClients"


interface PatchContentParams {
    content: string
}

export function usePatchContent(applicationId: number): UseMutationResult<void, Error, PatchContentParams> {
    return useMutation({
        meta: {
            errorMessage: "Failed to update application content",
            successMessage: "Application content updated successfully"
        },
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            const session = await getSession()
            
            await edenClient.api.applications({ id: applicationId }).content.patch(variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}