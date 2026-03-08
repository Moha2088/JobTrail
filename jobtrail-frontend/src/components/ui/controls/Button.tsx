
import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react"
import { LoadingDots } from "../view/motion/LoadingDots"
import { cn } from "@/lib/utils"
import * as React from "react"

const buttonStyles = cva(
    "flex justify-center items-center p-3 font-bold rounded-lg cursor-pointer",
    {
        variants: {
            variant:{
                dark: "bg-stone-800 text-white font-bold hover:bg-stone-500",
                light: "bg-white border-2 font-bold border-transparent shadow-md hover:bg-zinc-200",
                destructive: "bg-red-400 text-white hover:bg-red-500"
            },
            size: {
                large: "w-25 h-13",
                small: "w-20 h-10 text-xs"
            },
        },
        defaultVariants:{
            variant: "dark",
            size: "large"
        }
    }
)

interface ButtonProps extends VariantProps<typeof buttonStyles>, React.ComponentProps<"button"> {
    iconStart?: ReactNode
    iconEnd?: ReactNode
 }


export function Button({ variant, className, size, iconStart, iconEnd, children, ...props }: ButtonProps) {
    return (
        <button className={cn(buttonStyles({ variant, size }), className)} {...props}>
            <div className="flex gap-3">
                {iconStart &&
                    <div>
                        {iconStart}
                    </div>
                }
                {children}
                
                {iconEnd &&
                    <div>
                        {iconEnd}
                    </div>
                }
            </div>
            
        </button>
    )
}