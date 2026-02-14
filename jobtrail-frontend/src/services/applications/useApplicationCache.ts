import { useQueryClient } from "@tanstack/react-query"


export const useApplicationCache = () => {
    const queryClient = useQueryClient()

    return {
        invalidateApplications: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
        invalidateApplication: (applicationId: number) => queryClient.invalidateQueries({ queryKey: ["applications", applicationId] })
    }
}