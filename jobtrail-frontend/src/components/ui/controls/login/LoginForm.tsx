"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/controls/Button"
import { useRouter } from "next/navigation"
import { useLogin } from "@/services/auth/useLogin"
import { useState } from "react"
import axios from "axios"
import { LoadingDots } from "../../view/motion/LoadingDots"
import { motion } from "motion/react"

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

    const login = useLogin()

    const [passwordState, setPasswordState] = useState<PasswordState>("password")

    const onSubmit: SubmitHandler<LoginInput> = async(data) => {
        await axios.post("../../api/login", data)
        router.replace("/applications")
    }
 
    return (
        <>
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  duration : 0.5 }}
                className="flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col justify-center items-center gap-10 border-stone-300 border-3 w-130 h-120 ml-auto mr-auto rounded-xl">
                    <div>
                        <input
                            className="w-100 border-3 p-2 rounded-lg"
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

                    <div>
                        <input
                            type={passwordState}
                            className="w-100 border-3 p-2 rounded-lg"
                            placeholder="Enter your password"
                            {...register("password", { 
                                required: "Password is required!",
                                minLength: {
                                    value: 8,
                                    message: "Password must be atleast 8 characters"
                                }
                            })}
                        />

                        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    </div>

                    <div>
                        <Button
                            variant="light"
                            type="button"
                            size="small"
                            onClick={() => setPasswordState(passwordState == "password" ? "text" : "password")}
                        >
                            {passwordState == "password" ? "Show" : "Hide"} 
                        </Button>
                    </div>

                    <div>
                        <Button 
                            type="submit" 
                            disabled={errors.email?.message?.trim() == "" && errors.password?.message?.trim() ==""}
                        >
                            Login
                        </Button>
                    </div>
                </div>

            </motion.form>

        </>
    )
}