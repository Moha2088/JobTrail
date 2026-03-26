import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { IconCheck, IconSquare, IconSquareFilled, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"


const actionButtonStyles = cva(
    "text-white p-1 rounded-md w-10 flex justify-center cursor-pointer", {
        variants: {
            variant: {
                keep: "bg-green-400  hover:bg-green-500",
                discard: "bg-red-400  hover:bg-red-500",
                stop: "bg-red-400 hover:bg-red-500",
            }
        },

        defaultVariants: {
            variant: "keep"
        }
    }
)

interface ActionButtonProps extends VariantProps<typeof actionButtonStyles>, ComponentProps<"button"> {
    asChild?: boolean
}

export function ActionButton(props: ActionButtonProps) {
    const { variant, asChild, className, ...rest } = props

    const Component = asChild ? Slot : "button"

    return (
        <Component
            className={` ${cn(actionButtonStyles({ variant }), className)}`}
            {...rest}
        >
            {variant === "keep" &&
                <IconCheck size={15} />
            }

            {variant === "discard" &&
                <IconX size={15} />
            }

            {variant === "stop" &&
                <IconSquareFilled size={15} />
            }

        </Component>
    )
}