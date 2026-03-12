import type { Metadata } from "next"
import { Google_Sans, Inter, Roboto_Slab } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider"
import { Toaster } from "sonner"
import { AuthProvider } from "@/providers/AuthProvider"
import { ReactNode } from "react"
import { Navbar } from "@/components/ui/view/Navbar"

const robotoSlab = Roboto_Slab({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-roboto-slab",
})

const googleSans = Google_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
    title: {
        template: '%s · Jobtrail',
        default: 'Jobtrail',
    },
    description: 'Jobtrail.'
}

export default function RootLayout({
    children,
}: Readonly<{
  children: ReactNode
}>) {

    return (
        <html lang="en">
            <ReactQueryClientProvider>
                <AuthProvider>
                    <Theme>
                        <body className={` antialiased`}>
                            {/* <Navbar /> */}
                            <Toaster />
                            {children}
                        </body>
                    </Theme>
                </AuthProvider>
            </ReactQueryClientProvider>
        </html>
    )
}