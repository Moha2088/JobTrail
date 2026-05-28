import { edenClient } from "@/app/api/apiClients"
import { getSession } from "@/services/session/getSession"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"

interface UploadFileParams {
    file: File
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
            const { file, applicationId } = variables

            formData.append("file", file)
            formData.append("applicationId", applicationId.toString())


            await edenClient.api.applications.resume.post(variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            console.log("File upload successful with elysia type safe client")
        },

        onError:(err) => {
            console.error(err)
        }
    })
}