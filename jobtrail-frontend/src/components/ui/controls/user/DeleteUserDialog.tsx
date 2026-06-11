import { DialogProps } from "@radix-ui/react-dialog"
import { Dialog } from "radix-ui"
import { OverlayWrapper } from "@/components/ui/controls/OverlayWrapper"
import { Button } from "@/components/ui/controls/Button"
import { useDeleteUser } from "@/services/users/useDeleteUser"
import { useSession } from "@/services/session/useSession"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"
import { Input } from "@/components/ui/controls/Input"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DeleteUserDialogProps extends DialogProps {

}

export function DeleteUserDialog(props: DeleteUserDialogProps) {
    const { open, onOpenChange } = props

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Content />
        </Dialog.Root>
    )
}

interface ContentProps {
    onOpenChange?: (value: boolean) => void
}

function Content({ onOpenChange }: ContentProps) {

    const { data, isLoading } = useSession()

    const [confirmationInput, setConfirmationInput] = useState<string>("")

    const deleteUser = useDeleteUser(Number(data?.userId))

    const router = useRouter()

    if(isLoading) {
        return(
            <LoadingDots />
        )
    }

    return (
        <OverlayWrapper>
            <Dialog.Title className="flex justify-center text-2xl tracking-tighter text-red-400 font-bold mb-5">Delete User</Dialog.Title>
            <Dialog.Description className="flex justify-center font-bold mb-15" >Are you sure you want to delete your user?</Dialog.Description>

            <div className="flex flex-col justify-center" >
                <div className="flex justify-center mb-10">
                    <p>To confirm deletion, type <strong>{`"${data?.email}"`}</strong> in the box below.</p>
                </div>

                <div className="flex justify-center mb-10">
                    <Input
                        onChange={(e) => setConfirmationInput(e.target.value)}
                        value={confirmationInput}
                        className="w-full"
                    />
                </div>
            </div>


            <div className="flex justify-end gap-5">
                <Dialog.Close>
                    <Button
                        size="small"
                    >
                        Cancel
                    </Button>
                </Dialog.Close>

                <Dialog.Close>
                    <Button
                        disabled={confirmationInput !== data?.email}
                        variant="destructive"
                        size="small"
                        isPending={deleteUser.isPending}
                        onClick={() => {
                            deleteUser.mutate()
                            router.replace("/")
                        }}
                    >
                        Delete
                    </Button>
                </Dialog.Close>
            </div>
        </OverlayWrapper>
    )
}