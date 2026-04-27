"use client"

import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
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
                            position: "top-right",
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
                            position: "top-right",
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

    const persister = createAsyncStoragePersister({
        storage: typeof window !== "undefined" ? window.localStorage : undefined
    })

    return (
        <PersistQueryClientProvider 
            client={queryClient}
            persistOptions={{ 
                persister,
                dehydrateOptions: {
                    shouldDehydrateQuery: (query) => {
                        const queryKey = query?.queryKey[0] as string
                        return !["session"].includes(queryKey)
                    }
                }
            }}
        >
            {/* <TanStackDevtools /> */}
            {children}
        </PersistQueryClientProvider>
    )
}