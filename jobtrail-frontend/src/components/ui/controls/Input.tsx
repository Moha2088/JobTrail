import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps, ReactNode } from "react"

const inputStyles = cva(
    "border p-2", {
        variants: {
            variant: {
                squared: "rounded-none",
                rounded: "rounded-lg",
                pill: "rounded-full"
            }
        },

        defaultVariants: {
            variant: "rounded"
        }
    }
)

interface InputProps extends VariantProps<typeof inputStyles>, ComponentProps<"input"> {
    iconStart?: ReactNode
}


export function Input(props: InputProps) {
    const { className, iconStart, variant, ...rest } = props
    return (
        <div
            className={`flex gap-3  ${cn(inputStyles({ variant }), className)}`}
        >
            {iconStart}
            < hr className="border h-5" />
            <input className=" outline-0" {...rest} />
        </div>
    )
}
