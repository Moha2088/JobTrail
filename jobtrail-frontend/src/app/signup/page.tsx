import { SignupForm } from "@/components/ui/controls/signup/SignupForm"


export default function Page() {
    return (
        <>
            <div className="p-10" />

            <div className="flex justify-center">
                <h1 className="text-4xl font-bold">
                    Sign Up
                </h1>
            </div>

            <div className="p-5" />

            <SignupForm />
        </>
    )
}