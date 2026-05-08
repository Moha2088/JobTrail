"use client"

import { Label } from "@/components/ui/view/Label"
import {
    IconCheck,
    IconPointFilled,
    IconSparklesFilled,
} from "@tabler/icons-react"
import { MotionImage } from "@/components/ui/view/motion/Image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { MotionButton } from "@/components/ui/controls/motion/MotionButton"
import Image from "next/image"

export default function Home() {

    const router = useRouter()

    return (
        <>
            <div className="bg-linear-to-b from-blue-300 via-blue-300 to-white h-300 mb-10">

                <div className="p-3" />

                <div className="flex justify-end mr-5 gap-3">
                    <div>
                        <MotionButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            size="small"
                            className="w-fit"
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
                            size="small"
                            className="w-fit"
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
                        className="mr-auto ml-auto w-fit">
                        <Label
                            iconStart={<IconSparklesFilled color="white" />}
                            iconEnd={<IconPointFilled className="pt-1" size={20} color="white" />}
                        >
                            <Link href="/login">
                                Enhance your jobtracking now
                            </Link>
                        </Label>
                    </motion.div>

                    <div className="p-5" />

                    <div className="flex justify-center items-center">
                        <p className="text-4xl font-bold text-white max-w-300 ">
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
                        width={500}
                        height={0}
                        alt=""
                        className="w-200 rounded-xl"
                        src={"/landing/dashboard.png"} 
                    />
                </motion.div>
            </div>

            <div className="flex flex-row gap-100 mb-50">
                <div className="">
                    <Image
                        alt=""
                        src="/landing/landing-ai.png"
                        width="500"
                        height="100"
                    />
                </div>

                <div className="pt-20">
                    <p className="text-xl font-bold text-center" >
                        AI powered job tracking right at your fingertips.
                    </p>
                </div>
            </div>

            <div className="flex flex-row gap-80 mb-30">
                <div>
                    <Image 
                        alt=""
                        src="/landing/landing-ai-text.png"
                        width="400"
                        height="100"
                    />
                </div>

                <div>
                    <p className="text-xl font-bold text-center pt-60 max-w-130">
                        Leverage the power of AI to review and update your application in real time.
                    </p>
                </div>
            </div>


            <div className="flex flex-col justify-center items-center gap-3 mb-20">
                <div className="flex flex-row gap-2">
                    <p>Job application overview</p>
                    <IconCheck color="lightblue" size={30} />
                </div>

                <div className="flex flex-row gap-2">
                    <p>AI insight and recommendations</p>
                    <IconCheck color="lightblue" size={30} />
                </div>
            </div>

            {/* Footer  */}

            <div className="mb-5">
                <div className="flex flex-col mb-20 gap-2">
                    <div className="flex justify-center mt-10">
                        <h2 className="text-gray-400 font-bold text-sm">
                            Company
                        </h2>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            target="_blank"
                            href="https://jobtrail-ai.betteruptime.com"
                            className="font-bold text-md hover:underline"
                        >
                            Status
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            target="_blank"
                            href="/privacy-policy"
                            className="font-bold text-md hover:underline"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>


                <div className="flex justify-center font-bold">
                    @2026 JobTrail. All rights reserved
                </div>
            </div>
        </>
    )
}