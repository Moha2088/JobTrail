"use client"

import { elysiaApi } from "@/app/api/elysiaApi"
import { useMutation, UseMutationResult } from "@tanstack/react-query"


interface LoginParams {
    email: string
    password: string
}

export function useLogin() : UseMutationResult<void, Error, LoginParams> {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async(variables) => {
            await elysiaApi.api.auth.login.post(variables)
        },

        onSuccess: () => {
            console.log("Success!")
        },

        onError: () => {
            console.log("Error!")
        },

        onSettled: () => {
            console.log("Settled!")
        }
    })
}