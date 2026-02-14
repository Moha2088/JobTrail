"use client"

import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";


interface ProviderProps {
    children: ReactNode
}

export function Provider({children}: ProviderProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}