"use client"

import Image  from "next/image"
import astro from "../../assets/astro.webp"
import { Button } from "@/components/ui/controls/Button"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  duration : 0.5 }} 
                className="flex justify-center mt-5 mb-10">
                <p className="text-6xl font-bold">
                    404
                </p>    
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  duration : 0.5, delay: 1 }} 
                className="flex justify-center mb-5">
                <Image 
                    src={astro} 
                    alt="Astronaut"
                    className="rounded-xl"
                    height={300}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{  duration : 0.5, delay: 1.5 }}
            >
                <div className="flex justify-center mb-5">
                    <p className="text-lg">Lost in space? Click the button to go back</p>
                </div>

                
                <div className="flex justify-center">
                    <Button
                        className="w-fit"
                        variant="light" 
                        onClick={() => router.push("/")}
                    >
                        Back to the shuttle
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}