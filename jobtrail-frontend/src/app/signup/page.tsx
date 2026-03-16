import { SignupForm } from "@/components/ui/controls/signup/SignupForm"


export default function Page() {
    return (
        <>
            <div className="p-10 bg-blue-300" />

            <div className="flex justify-center bg-blue-300 text-white">
                <h1 className="text-4xl font-bold mb-10">
                    Sign Up
                </h1>
            </div>

            <SignupForm />
        </>
    )
}