import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { DialogProps } from "./types"
import { useApplicationContext } from "@/contexts/application/ApplicationContext"
import { useDeleteApplication } from "@/services/applications"
import { useRouter } from "next/navigation"

type DeleteApplicationDialogProps = DialogProps

export function DeleteApplicationDialog(props: DeleteApplicationDialogProps) {
    const { isOpen, onOpenChange } = props

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Content />
        </Dialog.Root>
    )
}


function Content() {

    const { applicationId } = useApplicationContext()

    const deleteApplication = useDeleteApplication()

    const router = useRouter()

    return (
        <form>
            <Dialog.Content className="mr-auto ml-auto w-200 bg-white p-5 rounded-xl z-10 absolute right-0 left-0">
                <Dialog.Title className="mb-3 text-2xl font-bold">Delete Application</Dialog.Title>
                <div className="p-2" />
                <Dialog.Description
                    className="mb-5">
                    Are you sure you want to delete this application?.
                </Dialog.Description>

                <div className="p-3" />

                <div className="flex justify-end gap-10" >
                    <Dialog.Close>
                        <Button
                            variant="light"
                            size="small">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close
                        type={"button"}
                    >
                        <Button
                            onClick={() => {
                                deleteApplication.mutate({
                                    applicationId: applicationId
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
                    </Dialog.Close>
                </div>
            </Dialog.Content>
        </form>
    )
}