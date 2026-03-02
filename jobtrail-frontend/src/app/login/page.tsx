import { LoginForm } from "@/components/ui/login/LoginForm"


export default function LoginPage() {

    return (
        <>
            <div className="p-10" />

            <div className="flex justify-center">
                <p className="text-4xl font-bold">
                    Login
                </p>
            </div>

            <div className="p-5" />

            <LoginForm/>
        </>
    )
}