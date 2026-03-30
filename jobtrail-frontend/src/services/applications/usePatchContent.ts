import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getSession } from "@/services/session/getSession"
import axios from "axios"


interface PatchContentParams {
    content: string
}

export function usePatchContent(applicationId: number): UseMutationResult<string | undefined, Error, PatchContentParams> {
    return useMutation({
        meta: {
            errorMessage: "Failed to update application content",
            successMessage: "Application content updated successfully"
        },
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            const session = await getSession()
            const { data } = await axios.patch(`http://localhost:3003/api/applications/${applicationId}/content`, variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            if(typeof data == "string") {
                return data
            }
        }
    })
}