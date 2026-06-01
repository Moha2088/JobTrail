import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostUser } from "./types"
import { axiosClient, edenClient } from "@/app/api/apiClients"


export function usePostUser(): UseMutationResult<void, Error, PostUser> {    
    return useMutation({
        meta: {
            errorMessage: "Failed to create user. Please try again.",
            conflictErrorMessage: "User already exists",
            successMessage: "User created successfully!"
        },
        mutationKey: ["users"],
        mutationFn: async(variables) => {
            const { status, error } = await edenClient.api.users.post(variables)
            
            if(status >= 400 || error) {
                throw new Error()
            }
        },
    })
}