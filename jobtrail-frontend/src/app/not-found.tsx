"use client"

import Image  from "next/image"
import astro from "../../assets/astro.webp"
import { Button } from "@/components/ui/controls/Button"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    return (
        <>
            <div className="p-10" />

            <div className="flex justify-center">
                <p className="text-6xl font-bold">
                    404
                </p>    
            </div>

            <div className="p-10" />

            <div className="flex justify-center">
                <Image 
                    src={astro} 
                    alt="Astronaut"
                    className="rounded-xl"
                    width={400}
                />
            </div>

            <div className="p-5" />

            <div className="flex justify-center">
                <p className="text-lg">Lost in space? Click the button to go back</p>
            </div>

            <div className="p-3" />
            
            <div className="flex justify-center">
                <Button
                    className="w-fit"
                    variant="light" 
                    onClick={() => router.push("/")}
                >
                    Back to the shuttle
                </Button>
            </div>
        </>
    )
}