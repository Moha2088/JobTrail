"use client"

import { Button } from "@/components/ui/controls/Button"
import { Label } from "@/components/ui/view/Label"
import dashboard from "../../assets/landing/dashboard.png"
import Image from "next/image"
import {
    IconArrowRight,
    IconCheck,
    IconShieldLock,
    IconShieldLockFilled,
    IconSparklesFilled
} from "@tabler/icons-react"
import { MotionImage } from "@/components/ui/view/motion/Image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { MotionButton } from "@/components/ui/controls/motion/MotionButton"
import { delay } from "motion"

export default function Home() {

    const router = useRouter()

    return (
        <>
            <div className="bg-linear-to-b from-black via-black to-white h-300">

                <div className="p-3" />

                <div className="flex justify-end mr-5 gap-3">
                    <div>
                        <MotionButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => router.push("/login")}
                        >
                            Log in
                        </MotionButton>
                    </div>

                    <div>
                        <MotionButton
                            variant="light"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => router.push("/signup")}
                        >
                            Sign Up
                        </MotionButton>
                    </div>
                    
                </div>

                <div className="p-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mr-auto ml-auto mt-5 w-fit">
                        <Label
                            iconStart={<IconSparklesFilled color="white" />}
                            iconEnd={<IconArrowRight color="white" />}
                        >
                            <Link href="/login">
                                Enhance your jobtracking now
                            </Link>
                        </Label>
                    </motion.div>

                    <div className="p-5" />

                    <div className="flex justify-center items-center">
                        <p className="text-5xl font-bold text-white max-w-300 ">
                            AI assisted job tracking for everyone
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex justify-center mt-20"
                >
                    <MotionImage
                        whileHover={{ scale: 1.1 }}
                        alt=""
                        className="w-300 rounded-xl"
                        src={dashboard} 
                    />
                </motion.div>
            </div>

            <div className="p-10" />

            <div className="flex justify-center">
                <p className="text-4xl font-bold text-center max-w-300" >
                    AI powered job tracking right at your fingertips.
                </p>
            </div>

            <div className="p-10" />

            <div className="flex flex-col justify-center items-center gap-3">
                <div className="flex flex-row gap-2">
                    <p>Job application overview</p>
                    <IconCheck color="lightblue" size={30} />
                </div>

                <div className="flex flex-row gap-2">
                    <p>AI insight and recommendations</p>
                    <IconCheck color="lightblue" size={30} />
                </div>
            </div>

            <div className="p-10" />

            {/* Footer  */}

            <div className="bg-stone-800 h-70">

                <div className="flex justify-center">
                    <Link
                        href="/privacy-policy"
                        className="font-bold text-xl mt-10 mb-20 text-white hover:underline"
                    >
                        Privacy Policy
                    </Link>
                </div>

                <div className="flex justify-center text-white font-bold">
                    @2026 JobTrail. All rights reserved
                </div>

            </div>

        </>
    )
}