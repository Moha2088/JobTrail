import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostUser } from "./types"
import { edenClient } from "@/app/api/apiClients"


export function usePostUser(): UseMutationResult<void, Error, PostUser> {

    return useMutation({
        meta: {
            errorMessage: "Failed to create user. Please try again.",
            successMessage: "User created successfully!"
        },
        mutationKey: ["users"],
        mutationFn: async(variables) => {
            await edenClient.api.users.post(variables)
        },
    })
}