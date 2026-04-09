import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getSession } from "@/services/session/getSession"
import axios from "axios"
import { elysiaApi } from "@/app/api/apiClients"


export function useDeleteFile(applicationId: number, key: string) {
    return useMutation({
        meta: {
            errorMessage: "Error deleting file!",
            successMessage: "File deleted successfully"
        },
        mutationKey: ["files", key],
        mutationFn: async() => {
            const session = await getSession()
            
            await elysiaApi.api.applications({ id: applicationId }).resume({ key: key }).delete({}, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}