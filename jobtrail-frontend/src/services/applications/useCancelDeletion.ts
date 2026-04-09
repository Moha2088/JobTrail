import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getSession } from "../session/getSession"
import axios from "axios"

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
            await axios.post("http://localhost:3003/api/applications/cancel-deletion/" + variables.applicationId, {}, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}