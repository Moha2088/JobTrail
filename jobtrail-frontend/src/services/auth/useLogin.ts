import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { getSession } from "../session/getSession"
import axios from "axios"

interface LoginParams {
    email: string
    password: string
}

export function useLogIn(): UseMutationResult<void, Error, LoginParams> {
    const queryClient = useQueryClient()
    return useMutation({
        meta: {
            "errorMessage": "Invalid email or password!"
        },
        mutationKey: ["login"],
        mutationFn: async(variables) => {
            const { data: sessionData } = await axios.post("/api/login", variables)
            // queryClient.setQueryData(["session"], sessionData)
        }
    })
}