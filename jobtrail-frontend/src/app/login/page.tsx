import { LoginForm } from "@/components/ui/login/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login",
}

export default function LoginPage() {
    return (
        <>
            <div className="p-10" />

            <div className="flex justify-center">
                <h1 className="text-4xl font-bold">
                    Login
                </h1>
            </div>

            <div className="p-5" />

            <LoginForm/>
        </>
    )
}