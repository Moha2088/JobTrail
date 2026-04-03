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
            <div className="p-5 bg-blue-300" />

            <div className=" bg-blue-300 h-screen">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold text-white mb-5">
                        Login
                    </h1>
                </div>

                <div className="p-5" />

                <Suspense fallback={<LoadingDots />}>
                    <LoginForm/>
                </Suspense>
            </div>
        </>
    )
}