import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getSession } from "../session/getSession"
import axios from "axios"
import { elysiaApi } from "@/app/api/apiClients"

interface CancelDeletionParams {
    applicationId: number
}

export function useCancelDeletion(): UseMutationResult<void, Error, CancelDeletionParams> {
    return useMutation({
        meta: {
            errorMessage: "Failed to cancel application deletion",
            successMessage: "Successfully cancelled application deletion"
        },
        mutationKey: ["applications"],
        mutationFn: async(variables) => {
            const session = await getSession()
            
            await elysiaApi.api.applications["cancel-deletion"]({ id: variables.applicationId }).post({}, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}