import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/apiClients"
import axios from "axios"
import { getSession } from "@/services/session/getSession"


export function usePostApplication(): UseMutationResult<void, Error, PostApplication> {
    return useMutation({
        meta: {
            successMessage: "Application created successfully",
            errorMessage: "Failed to create application"
        },
        mutationKey: ["applications"],
        mutationFn: async (variables) => {
            // await apiClients.api.applications.post(variables)

            const session = await getSession()

            await axios.post("http://localhost:3003/api/applications", variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}