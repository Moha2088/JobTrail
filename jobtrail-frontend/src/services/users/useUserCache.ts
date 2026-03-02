import { useQueryClient } from "@tanstack/react-query"


export const useUserCache = () => {
    const queryClient = useQueryClient()

    return {
        invalidateUsers: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
        invalidateUser: (userId: number) => queryClient.invalidateQueries({ queryKey: ["users", userId] })
    }
}