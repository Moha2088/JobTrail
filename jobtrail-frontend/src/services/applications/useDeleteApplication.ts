import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"   
import { getSession } from "@/services/session/getSession"
import { edenClient } from "@/app/api/apiClients"

interface DeleteApplicationParams {
    applicationId: number
}

export function useDeleteApplication(): UseMutationResult<void, Error, DeleteApplicationParams> {
    return useMutation({
        meta: {
            successMessage: "Application deleted successfully",
        },
        mutationKey: ["applications"],
        mutationFn: async(variables) => {
            const { applicationId } = variables
            const session = await getSession()
            
            await edenClient.api.applications({ id: applicationId }).delete(variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}