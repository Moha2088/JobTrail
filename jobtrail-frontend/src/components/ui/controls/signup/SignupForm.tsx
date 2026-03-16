"use client"

import { useForm } from "react-hook-form"
import { PasswordState } from "@/components/ui/controls/login/LoginForm"
import { Button } from "../Button"
import { usePostUser } from "@/services/users/usePostUser"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

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
                await axios.post("../../api/login", {
                    email: getValues("email"),
                    password: getValues("password")
                })

                router.push("/applications")
            }
        })
    }

    return (
        <>
            <form className="flex flex-col justify-center bg-blue-300" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center gap-6 border-3 p-12 bg-white w-130  ml-auto mr-auto rounded-xl">
                    <div >
                        <input
                            className="w-70 text-xs border-3 p-2 rounded-lg"
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
                            className="w-70 text-xs border-3 p-2 rounded-lg"
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

                    <div>
                        <input
                            type={passwordState}
                            className="w-70 text-xs border-3 p-2 rounded-lg"
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
                        <input
                            type={passwordState}
                            className="w-70 text-xs border-3 p-2 rounded-lg"
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

                    <div>
                        <Button
                            variant="light"
                            type="button"
                            size="small"
                            className="w-fit"
                            onClick={() => setPasswordState(passwordState == "password" ? "text" : "password")}
                        >
                            {passwordState == "password" ? "Show" : "Hide"} 
                        </Button>
                    </div>

                    <div>
                        <Button type="submit" disabled={errors.email?.message?.trim() == "" && errors.password?.message?.trim() ==""}>
                            Login
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}