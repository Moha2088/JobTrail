import { ReactQueryClientProvider } from "@/providers/PersistQueryClientProvider"
import { MockRouter } from "./mockRouter"

interface TestProvidersProps {
    children: React.ReactNode
    asPath?: string
}

export function TestProviders({ children, asPath }: TestProvidersProps) {
    return(
        <MockRouter asPath={asPath}>
            <ReactQueryClientProvider>
                {children}
            </ReactQueryClientProvider>
        </MockRouter>
    )
}