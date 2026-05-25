import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { PutUser } from "./types"
import { getSession } from "../session/getSession"
import axios from "axios"


export function usePutUser(userId: number): UseMutationResult<void, Error, PutUser> {
    return useMutation({
        meta: {
            errorMessage: "Failed to update user. Please try again.",
            successMessage: "User updated successfully!"
        },
        mutationKey: ["users", userId],
        mutationFn: async(variables) => {
            const session = await getSession()
            await axios.put(`/api/users/${userId}`, variables, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
            
        }
    })
}