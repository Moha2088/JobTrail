import { useMutation } from "@tanstack/react-query"
import axios from "axios"


export function useLogOut() {
    return useMutation({
        meta: {
            successMessage: "You have successfully logged out!",
            errorMessage: "Error logging out. Please try again."
        },
        mutationKey: ["logout"],
        mutationFn: async() => {
            await axios.post("../../api/logout")
        }
    })
}