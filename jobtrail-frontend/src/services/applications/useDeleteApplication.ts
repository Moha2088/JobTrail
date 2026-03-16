import { elysiaApi } from "@/app/api/apiClients"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"
import { getSession } from "@/services/session/getSession"
import { useRouter } from "next/navigation"

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
            
            await axios.delete(`http://localhost:3003/api/applications/${applicationId}`, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}