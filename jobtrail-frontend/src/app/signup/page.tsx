import { SignupForm } from "@/components/ui/signup/SignupForm"


export default function Page() {
    
    
    return (
        <>
            <div className="p-10" />

            <div className="flex justify-center">
                <p className="text-4xl font-bold">
                    Sign Up
                </p>
            </div>

            <div className="p-5" />

            <SignupForm />
        </>
    )
}