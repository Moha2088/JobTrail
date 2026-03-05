"use client"

import { elysiaApi } from "@/app/api/elysiaApi"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"


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
            toast.error("Email or password is incorrect!", {
                position: "top-right",
                action: {
                    label: "Cancel",
                    onClick: () => { }
                }
            })
        },

        onSettled: () => {
            console.log("Settled!")
        }
    })
}