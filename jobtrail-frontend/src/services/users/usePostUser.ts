import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostUser } from "./types"
import { elysiaApi } from "@/app/api/elysiaApi"
import axios from "axios"


export function usePostUser(): UseMutationResult<void, Error, PostUser> {

    return useMutation({
        mutationKey: ["users"],
        mutationFn: async(variables) => {
            // await elysiaApi.api.users.post(variables)
            await axios.post("http://localhost:3003/api/users", variables)
        },

        meta: {
            invalidateQueries: "users"
        },

        onSuccess: () => {
            console.log("User created successfully")
        }
    })
}