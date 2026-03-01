"use client"

import { elysiaApi } from "@/app/api/elysiaApi"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"


interface LoginParams {
    email: string
    password: string
}

interface LoginData {
    token: string
}

axios.defaults.withCredentials = true

export function useLogin() : UseMutationResult<LoginData, Error, LoginParams> {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async(variables) => {
            // await elysiaApi.api.auth.login.post(variables)
            const { data } = await axios.post<LoginData>(`http://localhost:3003/api/auth/login`, variables)
            return data
        },

        onSuccess: () => {
            console.log("Success!")
        },

        onError: (err) => {
            console.log(err.message)
        },

        onSettled: () => {
            console.log("Settled!")
        }
    })
}