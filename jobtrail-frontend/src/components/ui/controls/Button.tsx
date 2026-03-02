
import { cva, VariantProps } from "class-variance-authority"
import { ButtonHTMLAttributes } from "react"


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
            disabled: {
                true: "pointer-events-none opacity-50"
            }
        },
        defaultVariants:{
            variant: "dark",
            size: "large"
        }
    }
)

interface ButtonProps extends VariantProps<typeof buttonStyles>, ButtonHTMLAttributes<HTMLButtonElement> { }


export function Button({ variant, size, children, disabled, ...props }: ButtonProps) {
    return (
        <button className={(buttonStyles({ variant, size, disabled }))} {...props}>
            {children}
        </button>
    )
}