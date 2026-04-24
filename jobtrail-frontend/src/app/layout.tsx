import type { Metadata } from "next"
import { Google_Sans, Outfit } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import { ReactQueryClientProvider } from "@/providers/PersistQueryClientProvider"
import { Toaster } from "sonner"
import { AuthProvider } from "@/providers/AuthProvider"
import { ReactNode } from "react"
import { Navbar } from "@/components/ui/view/Navbar"

export const metadata: Metadata = {
    title: {
        template: '%s · Jobtrail',
        default: 'Jobtrail',
    },
    description: 'Jobtrail.'
}


const googleSans = Google_Sans({
    variable: "--font-google-sans",
})

export default function RootLayout({
    children,
}: Readonly<{
  children: ReactNode
}>) {

    return (
        <html lang="en">
            <body className={`${googleSans.className} antialiased`}>
                <ReactQueryClientProvider>
                    <AuthProvider>
                        <Theme style={{ ["--default-font-family" as string]: "var(--font-google-sans)" }}>
                            {/* <Navbar /> */}
                            <Toaster />
                            {children}
                        </Theme>
                    </AuthProvider>
                </ReactQueryClientProvider>
            </body>
        </html>
    )
}