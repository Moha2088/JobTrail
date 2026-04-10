import { cn } from "@/lib/utils"
import { Dialog } from "radix-ui"
import { HTMLAttributes, PropsWithChildren } from "react"


interface OverlayWrapperProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {

}


export function OverlayWrapper(props: OverlayWrapperProps) {
    const { children, className, ...rest } = props
    
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
            <Dialog.Content
                className={cn("fixed inset-0 z-50 m-auto h-fit w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-5", className)}
                {...rest}
            >
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    )
}
