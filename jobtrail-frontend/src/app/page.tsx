"use client"

import { Button } from "@/components/ui/controls/Button"
import { Label } from "@/components/ui/view/Label"
import dashboard from "../../assets/landing/dashboard.png"
import Image from "next/image"
import { IconArrowRight } from "@tabler/icons-react"
import { MotionImage } from "@/components/ui/view/motion/Image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"

export default function Home() {

    const router = useRouter()

    return (
        <>

            {/* <Image 
                alt="" 
                src={treeImage}
                className=""
            /> */}

            <div className="bg-linear-to-b from-orange-300 to-white h-300">

                <div className="p-3" />

                <div className="flex justify-end mr-5">
                    <Button
                        size="small"
                        onClick={() => router.push("/login")}
                    >
                        Log in
                    </Button>
                </div>

                <div className="p-10" />
                
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex justify-center mt-5">
                    <Label
                        icon={<IconArrowRight color="white" />}
                    >
                        <Link href="/login">
                            Enhance your workflow now
                        </Link>
                    </Label>
                </motion.div>

                <div className="p-5" />

                <div className="flex justify-center items-center">
                    <p className="text-5xl font-bold text-white max-w-150 ">
                        AI assisted job tracking for everyone
                    </p>                        
                </div>

                <div className="flex justify-center mt-20">
                    <MotionImage
                        whileHover={{ scale: 1.1 }}
                        alt=""
                        className="w-300 rounded-xl"
                        src={dashboard} 
                    />
                </div>

            </div>

            <div className="p-10" />

        </>
    )
}