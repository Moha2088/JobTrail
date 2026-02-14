import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { PostApplication } from "./types";
import { elysiaApi } from "@/app/api/elysiaApi";
import { useApplicationCache } from "./useApplicationInvalidator";

type PutApplication = Omit<PostApplication, "id">

export function usePutApplication(applicationId: never): UseMutationResult<void, Error, PutApplication> {
    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            await elysiaApi.api.applications({ id: applicationId }).put(variables)
        },

        onSuccess: () => {
            const applicationCache = useApplicationCache()
            applicationCache.invalidateApplication(applicationId)
        }
    })
}