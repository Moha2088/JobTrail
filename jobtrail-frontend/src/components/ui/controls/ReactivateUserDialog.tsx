"use client"

import { Dialog } from "radix-ui"
import { DialogProps } from "@radix-ui/react-dialog"
import { OverlayWrapper } from "./OverlayWrapper"
import Image from "next/image"
import { useCancelUserDeletion } from "@/services/users/useCancelUserDeletion"
import { useSessionContext } from "@/contexts/session/SessionContext"
import { useRouter } from "next/navigation"
import { Button } from "./Button"
import axios from "axios"
import { useUser } from "@/services/users/useUser"
import { LoadingDots } from "../view/motion/LoadingDots"
import { useQueryClient } from "@tanstack/react-query"

interface ReactivateUserDialogProps extends DialogProps {

}

export function ReactivateUserDialog(props: ReactivateUserDialogProps) {
    const { open, onOpenChange } = props

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Content />
        </Dialog.Root>
    )
}

function Content() {
    const session = useSessionContext()

    const cancelDeletion = useCancelUserDeletion(session?.userId)
    
    const router = useRouter()

    return (
        <OverlayWrapper>
            <Dialog.Title className="flex justify-center text-2xl tracking-tighter text-red-400 font-bold mb-5">
                Reactivate User?
            </Dialog.Title>

            <div className="flex justify-center items-center mt-10 md:mt-30 flex-col gap-5 md:gap-10">

                <div>
                    <Image
                        width="300"
                        height="10"
                        src="/open-door.jpg"
                        alt="an open door"
                        className="rounded-xl"
                    />
                </div>

                <div>
                    <h1 className="">
                        This account has been scheduled for deletion
                    </h1>
                </div>
                
                <div>
                    <p className="font-bold">
                        Do you want to reactivate your account
                    </p>
                </div>

                <div className="flex gap-5">
                    <div>
                        <Button
                            isPending={cancelDeletion.isPending}
                            onClick={() => {
                                cancelDeletion.mutate(undefined, {
                                    onSuccess: () => router.push("/applications")
                                })
                            }}
                        >
                            Reactivate account
                        </Button>
                    </div>

                    <div>
                        <Button
                            onClick={() => {
                                axios.post("/api/logout").then(() => router.replace("/"))
                            }}
                            variant="destructive"
                        >
                            Log Out
                        </Button>
                    </div>                
                </div>
            </div>
        </OverlayWrapper>
    )
}