"use client"

import { useForm } from "react-hook-form"
import { PasswordState } from "@/components/ui/controls/login/LoginForm"
import { Button } from "../Button"
import { usePostUser } from "@/services/users/usePostUser"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { IconEye, IconEyeClosed } from "@tabler/icons-react"
import Link from "next/link"
import { motion } from "motion/react"

export function SignupForm() {

    type SigninInput = {
        name: string
        email: string
        password: string
        confirmedPassword: string
    }

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<SigninInput>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmedPassword: ""
        }
    })

    const [passwordState, setPasswordState] = useState<PasswordState>("password")

    const createUser = usePostUser()

    const router = useRouter()

    const onSubmit = (data: SigninInput) => {
        createUser.mutate({
            name: data.name,
            email: data.email,
            password: data.password
        }, {
            onSuccess: async() => {
                console.log("User created successfully! Logging in...")
                await axios.post("../../api/login", {
                    email: getValues("email"),
                    password: getValues("password")
                })

                router.push("/applications")
            },

            onError: (error) => {
                console.error("Error creating user:", error)
            }
        })
    }

    return (
        <>
            <form
                className="flex flex-col justify-center min-h-screen" onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{  duration : 0.5 }}
                    className="flex flex-col justify-center items-center gap-6 px-6 md:px-16 py-6 md:py-10 bg-white border-2 border-stone-200 ml-auto mr-auto rounded-xl w-full md:w-auto max-w-lg mx-4">
                    <div className="flex flex-col gap-3">
                        <div className="mr-auto">
                            <h1 className="text-2xl font-bold mb-3">
                                Sign Up
                            </h1>
                        </div>

                        <div >
                            <input
                                className="w-full text-xs border-3 p-2 rounded-lg"
                                placeholder="Enter your name" 
                                {...register("name", { 
                                    required: "Name is required!",
                                    validate:(value) =>{
                                        return true
                                    } })}
                            />

                            {errors.name && <p className="text-red-400 text-sm">{errors.name?.message}</p>}
                        </div>
                        
                        <div>
                            <input
                                className="w-full text-xs border-3 p-2 rounded-lg"
                                placeholder="Enter your email" 
                                {...register("email", { 
                                    required: "Email is required!",
                                    validate:(value) => {
                                        if(!value.includes("@")) {
                                            return "Email is not valid!"
                                        }

                                        return true
                                    }
                                })}
                            />

                            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="flex gap-3">
                            <div>
                                <input
                                    type={passwordState}
                                    className="w-full text-xs border-3 p-2 rounded-lg"
                                    placeholder="Enter your password"
                                    {...register("password", { 
                                        required: "Password is required!",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be atleast 8 characters"
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

                            </div>

                            <div>
                                <Button
                                    variant="ghost"
                                    type="button"
                                    size="small"
                                    className="w-fit"
                                    onClick={() => setPasswordState(passwordState == "password" ? "text" : "password")}
                                >
                                    {passwordState == "password" ? <IconEyeClosed /> : <IconEye />} 
                                </Button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <input
                                type={passwordState}
                                className="w-full text-xs border-3 p-2 rounded-lg"
                                placeholder="Confirm password"
                                {...register("confirmedPassword", { 
                                    required: "Password must be confirmed!",
                                    validate: (value) => {
                                        if(getValues(("password") ) != value.trim()) {
                                            return "Passwords do not match!"
                                        }

                                        return true
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password must be atleast 8 characters"
                                    }
                                })}
                            />

                            {errors.confirmedPassword && <p className="text-red-400 text-sm">{errors.confirmedPassword.message}</p>}
                        </div>

                        <div className="flex gap-3 ">
                            <div>
                                <Button
                                    size="small"
                                    type="submit"
                                    className="w-full md:w-25"
                                    isPending={createUser.isPending}
                                    disabled={!!errors.email || !!errors.password || !!errors.confirmedPassword || createUser.isPending}
                                >
                                    Sign Up
                                </Button>
                            </div>

                            <div>
                                <p className="text-xs pt-3 text-gray-600">
                                    Already have an account? <Link className="font-bold hover:underline" href="/login">Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </form>
        </>
    )
}