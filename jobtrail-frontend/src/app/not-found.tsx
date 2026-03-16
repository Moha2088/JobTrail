"use client"

import Image  from "next/image"
import { Button } from "@/components/ui/controls/Button"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import { IconRocket } from "@tabler/icons-react"

export default function NotFound() {
    const router = useRouter()

    return (
        <>
            <div className="p-5 bg-black" />
        
            <div 
                className="bg-black h-screen text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{  duration : 0.5 }} 
                    className="flex justify-center mb-10">
                    <p className="text-6xl font-bold">
                        404
                    </p>    
                </motion.div>

                <motion.div
                    initial={{ opacity: 1, y: 20 }}
                    animate={{ opacity: [1], y: [ 0, 20, 0, 0] }}
                    transition={{ 
                        duration: 5,
                        repeat: Infinity,
                    }}
                    className="flex justify-center mb-5"
                >
                    <Image
                        src={"/astro.webp"}
                        alt="Astronaut"
                        width={300}
                        className="rounded-xl"
                        height={300}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration : 0.5, delay: 1.5 }}
                >
                    <div className="flex justify-center mb-5">
                        <p className="text-lg font-bold">
                            Lost in space? Click the button to go back
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Button
                            className="w-fit text-black"
                            variant="light"
                            iconEnd={<IconRocket size={25} />}
                            onClick={() => router.push("/applications")}
                        >
                            Back to the shuttle
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}