"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/controls/Button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { IconEye, IconEyeClosed } from "@tabler/icons-react"
import { useLogIn } from "@/services/auth/useLogin"
import { Input } from "../Input"

type LoginInput = {
    email: string
    password: string
}

export type PasswordState = "text" | "password"


export function LoginForm(){
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectPath = searchParams.get("redirect")

    const [passwordState, setPasswordState] = useState<PasswordState>("password")

    const login = useLogIn()

    const onSubmit: SubmitHandler<LoginInput> = async(data) => {
        await login.mutateAsync(data)
        router.replace(redirectPath ?? "/applications")
    }


    return (
        <>
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  duration : 0.5 }}
                className="flex flex-col justify-center min-h-screen text-xs" onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col justify-center items-center gap-5 border-stone-300 w-full md:w-auto max-w-lg h-fit px-6 md:px-15 py-8 md:py-15 bg-white ml-auto mr-auto rounded-xl mx-4">
                    <div>
                        <div className="mb-5">
                            <h1 className="text-2xl font-bold">
                                Login
                            </h1>
                        </div>

                        <div className="mb-3">
                            <Input
                                className="w-full text-xs border-3 p-2 mb-1 rounded-lg"
                                placeholder="Enter your email" 
                                {...register("email", { 
                                    required: "Email is required!",
                                    validate:(value) =>{
                                        if(!value.includes("@")) {
                                            return "Email is not valid!"
                                        }

                                        return true
                                    } })}
                            />

                            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                        </div>

                        <div className="flex gap-3">
                            <div className="mb-5">
                                <Input
                                    type={passwordState}
                                    className="w-full text-xs border-3 p-2 rounded-lg mb-1"
                                    
                                    placeholder="Enter your password"
                                    {...register("password", { 
                                        required: "Password is required!",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        }
                                    })}
                                />

                                {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                            </div>

                            <div>
                                <Button
                                    variant="ghost"
                                    type="button"
                                    size="small"
                                    className="w-fit"
                                    onClick={() => setPasswordState(passwordState == "password" ? "text" : "password")}
                                >
                                    {passwordState == "password" ? <IconEyeClosed /> : <IconEye /> }
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="">
                                <Button
                                    type="submit"
                                    size="small"
                                    className="w-full md:w-25"
                                    isPending={login.isPending}
                                    disabled={!!errors.email || !!errors.password || login.isPending}
                                >
                                    Login
                                </Button>
                            </div>

                            <div>
                                <div className="flex pt-3 gap-1">
                                    <div>
                                        <p className="text-xs">
                                            Don&apos;t have an account?
                                        </p>
                                    </div>

                                    <div>
                                        <Link
                                            className="text-xs font-bold hover:underline" 
                                            href="/signup"
                                        >
                                            Create one now!
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.form>
        </>
    )
}