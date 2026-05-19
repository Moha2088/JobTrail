import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"


export function useLogOut() {
    const queryClient = useQueryClient()

    return useMutation({
        meta: {
            successMessage: "You have successfully logged out!",
            errorMessage: "Error logging out. Please try again."
        },
        mutationKey: ["logout"],
        mutationFn: async() => {
            await axios.post("../../api/logout")
            queryClient.clear()
        }
    })
}