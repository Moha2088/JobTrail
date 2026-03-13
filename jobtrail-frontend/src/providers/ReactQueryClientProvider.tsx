"use client"

import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactNode, useState } from "react"
import { toast } from "sonner"

interface ProviderProps {
    children: ReactNode
}

export interface MutationMetaOptions {
    successMessage?: string
    errorMessage?: string
}


export function ReactQueryClientProvider({ children }: ProviderProps) {
    const [queryClient] = useState(() => {
        const queryClient: QueryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 5 * 60 * 1000
                }
            },
            mutationCache: new MutationCache({
                onSuccess: async(data, variables, onMutateResult, mutation) => {
                    const options = mutation.meta as MutationMetaOptions

                    if(options?.successMessage) {
                        toast.success(options.successMessage, {
                            action: {
                                label: "Cancel",
                                onClick: () => { }
                            }
                        })
                    }
                    await queryClient.invalidateQueries({ queryKey: mutation.options.mutationKey })
                },

                onError: async(data, variables, onMutateResult, mutation) => {
                    const options = mutation.meta as MutationMetaOptions

                    if(options?.errorMessage) {
                        toast.error(options.errorMessage, {
                            action: {
                                label: "Cancel",
                                onClick: () => { }
                            }
                        })
                    }
                }
            })
        })
        return queryClient
    })

    return (
        <QueryClientProvider client={queryClient}>
            <TanStackDevtools />
            {children}
        </QueryClientProvider>
    )
}