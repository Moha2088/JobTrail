import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"

interface LoginParams {
    email: string
    password: string
}

export function useLogIn(): UseMutationResult<void, Error, LoginParams> {
    return useMutation({
        meta: {
            "errorMessage": "Invalid email or password!"
        },
        mutationKey: ["login"],
        mutationFn: async(variables) => {
            await axios.post("/api/login", variables)
        }
    })
}