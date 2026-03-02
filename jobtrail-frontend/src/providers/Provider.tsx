"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactNode, useState } from "react"


interface ProviderProps {
    children: ReactNode
}

export function Provider({ children }: ProviderProps) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000
            }
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <TanStackDevtools />
            {children}
        </QueryClientProvider>
    )
}