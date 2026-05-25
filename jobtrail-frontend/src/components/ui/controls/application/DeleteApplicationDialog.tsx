import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { OverlayWrapper } from "../OverlayWrapper"
import { useApplicationContext } from "@/contexts/application/ApplicationContext"
import { useDeleteApplication } from "@/services/applications"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-dialog"

interface DeleteApplicationDialogProps extends DialogProps {

}

export function DeleteApplicationDialog(props: DeleteApplicationDialogProps) {
    const { open, onOpenChange } = props

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Content />
        </Dialog.Root>
    )
}


function Content() {
    const { application } = useApplicationContext()

    const deleteApplication = useDeleteApplication()

    const router = useRouter()

    return (
        <OverlayWrapper className="w-fit">
            <Dialog.Title className="flex justify-center mb-5 text-xl tracking-tighter text-red-400 font-bold">
                Delete Application
            </Dialog.Title>
            
            <Dialog.Description
                className="flex justify-center mb-10 font-bold text-sm">
                Are you sure you want to delete this application?.
            </Dialog.Description>

            <div className="flex justify-end gap-5" >
                <Dialog.Close asChild>
                    <Button
                        type="button"
                        variant="light"
                        size="small">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Button
                    variant="destructive"
                    isPending={deleteApplication.isPending}
                    onClick={() => {
                        deleteApplication.mutate({
                            applicationId: application.id
                        }, {
                            onSuccess: () => {
                                router.push("/applications")
                            }
                        })
                    }}
                    size="small"
                >
                    Delete
                </Button>
            </div>
        </OverlayWrapper>
    )
}