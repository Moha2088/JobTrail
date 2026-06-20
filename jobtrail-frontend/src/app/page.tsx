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
import { useState } from "react"
import { PreviewTab } from "@/components/ui/controls/landing/PreviewTab"


export type PreviewTabType = "Application Management" | "AI"

export default function Home() {
    const router = useRouter()

    const [previewTab, setPreviewTab] = useState<PreviewTabType>("Application Management")

    const handleTab = (tab: PreviewTabType) => {
        setPreviewTab(tab)
    }

    return (
        <>
            <div className="bg-linear-to-b from-blue-300 via-blue-300 to-white min-h-screen md:h-300 md:min-h-0 pb-10 md:pb-0 mb-10">

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
                        <p className="text-4xl font-bold text-white max-w-full md:max-w-300 px-4 text-center">
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
                        className="w-full max-w-xl md:w-200 "
                        src={"/landing/dashboard.png"} 
                    />
                </motion.div>
            </div>

            <div className="flex justify-center mb-20">
                <PreviewTab
                    setPreviewTab={handleTab}
                />
            </div>

            <div className="flex justify-center mb-5">
                <p className="text-gray-500 text-sm">
                    {previewTab == "Application Management" ? "Create and track applications with ease" : "AI enhancement feature ensures each application is better than the last"}
                </p>
            </div>

            <div className="flex justify-center items-center mb-20">
                <Image
                    alt="" src={previewTab == "Application Management" ? "/landing/create-application-demo.gif" : "/landing/enhance-ai-demo.gif"}
                    width={1}
                    height={1}
                    className="w-200 h-100 rounded-xl"/>
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
                            rel="noopener noreferrer"
                            href="https://jobtrail-ai.betteruptime.com"
                            className="font-bold text-md hover:underline"
                        >
                            Status
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
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