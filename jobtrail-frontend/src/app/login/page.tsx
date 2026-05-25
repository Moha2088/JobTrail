import { LoginForm } from "@/components/ui/controls/login/LoginForm"
import { Metadata } from "next"
import { Suspense } from "react"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"

export const metadata: Metadata = {
    title: "Login",
}

export default function LoginPage() {
    return (
        <>
            

            <div className=" bg-blue-300 h-screen">
                <Suspense fallback={<LoadingDots />}>
                    <LoginForm/>
                </Suspense>
            </div>
        </>
    )
}