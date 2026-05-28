import { edenClient } from "@/app/api/apiClients"
import { useMutation } from "@tanstack/react-query"
import { getSession } from "../session/getSession"


export function useCancelUserDeletion(id: number) {
    return useMutation({
        meta: {
            errorMessage: "Error reactivating user",
            successMessage: "Successfully reactivated user!",
        },
        mutationKey: ["cancel-user", id], // ???,
        mutationFn: async() => {
            const session = await getSession()

            await edenClient.api.users["cancel-deletion"]({ id }).post(null, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}