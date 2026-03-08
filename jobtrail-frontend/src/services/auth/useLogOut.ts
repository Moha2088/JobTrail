import { useMutation } from "@tanstack/react-query"
import axios from "axios"


export function useLogOut() {
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async() => {
            await axios.post("../../api/logout")
        }
    })
}