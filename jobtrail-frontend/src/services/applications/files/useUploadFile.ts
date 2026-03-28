import { getSession } from "@/services/session/getSession"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"
import { User } from "lucide-react"

interface UploadFileParams {
    file: File
    userId: number
    applicationId: number
}

export function useUploadFile(): UseMutationResult<void, Error, UploadFileParams> {
    return useMutation({
        meta: {
            errorMessage: "Error uploading file!",
            successMessage: "File uploaded successfully"
        },
        mutationKey:["files"],
        mutationFn: async (variables) => {
            const session = await getSession()
            const formData = new FormData()
            formData.append("file", variables.file)
            formData.append("userId", variables.userId.toString())
            formData.append("applicationId", variables.applicationId.toString())
            await axios.post("http://localhost:3003/api/applications/resume", formData, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken,
                    "Content-Type": "multipart/form-data"
                }
            })
        },

        onError:(err) => {
            console.error(err)
        }
    })
}