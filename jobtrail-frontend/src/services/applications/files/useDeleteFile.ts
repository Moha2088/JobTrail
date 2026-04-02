import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { getSession } from "@/services/session/getSession"
import axios from "axios"


export function useDeleteFile(applicationId: number, key: string) {
    return useMutation({
        meta: {
            errorMessage: "Error deleting file!",
            successMessage: "File deleted successfully"
        },
        mutationKey: ["files", key],
        mutationFn: async() => {
            const session = await getSession()
            await axios.delete(`http://localhost:3003/api/applications/${applicationId}/resume/${key}`, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}