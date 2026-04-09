import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostUser } from "./types"
import { elysiaApi } from "@/app/api/apiClients"


export function usePostUser(): UseMutationResult<void, Error, PostUser> {

    return useMutation({
        meta: {
            errorMessage: "Failed to create user. Please try again.",
            successMessage: "User created successfully!"
        },
        mutationKey: ["users"],
        mutationFn: async(variables) => {
            await elysiaApi.api.users.post(variables)
        },
    })
}