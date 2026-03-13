"use client"

import { elysiaApi } from "@/app/api/apiClients"
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
        meta: {
            errorMessage: "Email or password is incorrect. Please try again"
        },
        mutationKey: ["login"],
        mutationFn: async(variables) => {
            // await apiClients.api.auth.login.post(variables)
            const { data } = await axios.post("/auth/login", variables)
            return data
        }
    })
}