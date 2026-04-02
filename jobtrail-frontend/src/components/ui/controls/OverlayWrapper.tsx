import { Dialog } from "radix-ui"
import { ReactNode } from "react"


interface OverlayWrapperProps {
    children: ReactNode
}


export function OverlayWrapper({ children }: OverlayWrapperProps) {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
            <Dialog.Content className="fixed inset-0 z-50 m-auto h-fit w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-5">
                {children}
            </Dialog.Content>
        </Dialog.Portal>
    )
}
