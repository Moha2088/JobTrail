
import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { Spinner } from "../spinner"

const buttonStyles = cva(
    "flex justify-center items-center font-bold text-sm rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant:{
                dark: "bg-stone-800 text-white font-bold hover:bg-stone-500",
                light: "bg-white border-2 font-bold border-transparent border-gray-100 border-2 hover:bg-zinc-200",
                destructive: "bg-red-400 text-white hover:bg-red-500",
                ghost: "font-bold hover:bg-gray-100",
            },
            size: {
                large: "p-3 w-25 h-15",
                small: "p-3 w-30 h-10"
            },
        },
        defaultVariants:{
            variant: "dark",
            size: "large"
        }
    }
)

interface ButtonProps extends VariantProps<typeof buttonStyles>, ComponentProps<"button"> {
    iconStart?: ReactNode
    iconEnd?: ReactNode
    asChild?: boolean
    isPending?: boolean
 }


export function Button({ variant, className, size, iconStart, iconEnd, asChild, isPending, children, ...props }: ButtonProps) { 
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            {...props}
            className={cn(buttonStyles({ variant, size }), className)} 
        >
            <div className="flex gap-3">
                {iconStart &&
                    <div>
                        {iconStart}
                    </div>
                }

                {isPending ? <Spinner /> : children}

                {iconEnd &&
                    <div>
                        {iconEnd}
                    </div>
                }
            </div>
        </Comp>
    )
}