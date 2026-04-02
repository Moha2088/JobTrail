import { DialogProps } from "@radix-ui/react-dialog"
import { Dialog } from "radix-ui"
import { OverlayWrapper } from "@/components/ui/controls/OverlayWrapper"
import { Button } from "@/components/ui/controls/Button"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Provider } from "@/app/applications/[applicationId]/page"
import { useDeleteFile } from "@/services/applications/files"
import { useApplicationContext } from "@/contexts/application/ApplicationContext"

export interface DeleteFileDialogProps extends DialogProps {

}

export function DeleteFileDialog(props: DeleteFileDialogProps) {
    const { open, onOpenChange } = props

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Content  onOpenChange={onOpenChange} />
        </Dialog.Root>
    )
}


interface ContentProps {
    onOpenChange?: (value: boolean) => void
}

function Content({ onOpenChange }: ContentProps) {

    const { application } = useApplicationContext()

    const deleteFile = useDeleteFile(Number(application.id), application.key as string)

    return(
        <OverlayWrapper>
            <Dialog.Title className="mb-5 text-2xl font-bold">Delete File</Dialog.Title>
            <Dialog.Description className="mb-10">Are you sure, you want to delete the file?</Dialog.Description>

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
                        variant="destructive"
                        size="small"
                        onClick={() => deleteFile.mutate()}
                    >
                        Delete
                    </Button>
                </Dialog.Close>
            </div>

        </OverlayWrapper>
    )
}