import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/apiClients"
import axios from "axios"
import { useSession } from "../session/useSession"
import { toast } from "sonner"

type PutApplication = Omit<PostApplication, "id">

export function usePutApplication(applicationId: number): UseMutationResult<void, Error, PutApplication> {
    const session = useSession()

    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            await axios.patch(`http://localhost:3003/api/applications/${applicationId}`, variables, {
                headers: {
                    Authorization: "Bearer " + session?.data?.accessToken
                }
            })
        },

        onSuccess: () => {
            toast.success("Application updated successfully!")
        },

        onError: (error) => {
            toast.error("Failed to update application. Please try again.")
        }
    })
}