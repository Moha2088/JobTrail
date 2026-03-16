import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/apiClients"
import axios from "axios"
import { useSession } from "../session/useSession"

type PutApplication = Omit<PostApplication, "id">

export function usePutApplication(applicationId: number): UseMutationResult<void, Error, PutApplication> {
    const session = useSession()

    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            await axios.put(`http://localhost:3003/api/applications/${applicationId}`, variables, {
                headers: {
                    Authorization: "Bearer " + session?.data?.accessToken
                }
            })
        }
    })
}