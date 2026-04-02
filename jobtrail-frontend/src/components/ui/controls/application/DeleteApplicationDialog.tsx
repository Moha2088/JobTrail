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
        <OverlayWrapper>
            <Dialog.Title className="mb-3 text-2xl font-bold">Delete Application</Dialog.Title>
            <div className="p-2" />
            <Dialog.Description
                className="mb-5">
                Are you sure you want to delete this application?.
            </Dialog.Description>

            <div className="p-3" />

            <div className="flex justify-end gap-10" >
                <Dialog.Close asChild>
                    <Button
                        type="button"
                        variant="light"
                        size="small">
                        Cancel
                    </Button>
                </Dialog.Close>
                <Button
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