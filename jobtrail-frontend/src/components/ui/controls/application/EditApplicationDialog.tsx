import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { usePutApplication } from "@/services/applications"
import { useForm } from "react-hook-form"
import { ApplicationStatus, StatusDropdownMenu } from "@/components/ui/controls/application/StatusDropdownMenu"
import { OverlayWrapper } from "../OverlayWrapper"
import { useState } from "react"
import { useApplicationContext } from "@/contexts/application/ApplicationContext"
import { Input } from "@/components/ui/controls/Input"
import { DialogProps } from "@radix-ui/react-dialog"
import { statusColorMap } from "./CreateApplicationDialog"
import { CurrentTextLength } from "../../view/applications/CurrentTextLength"
import { ProgressCircle } from "../../progress-circle"  

interface EditApplicationDialogProps extends DialogProps{

}


export function EditApplicationDialog(props: EditApplicationDialogProps) {
    const { open, onOpenChange } = props

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            < Content onOpenChange={onOpenChange} />
        </Dialog.Root>
    )
}

type EditApplicationInput = {
    companyName: string
    email: string
    applicationStatus: string
    position: string
    content: string
}

interface ContentProps {
    onOpenChange?: (open: boolean) => void
}


function Content(props: ContentProps) {
    const { onOpenChange } = props
    const { application } = useApplicationContext()

    const editApplication = usePutApplication(application?.id)

    const [isDropDownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [applicationStatus, setApplicationStatus] = useState<string>(application?.applicationStatus)
    const [currentLength, setCurrentLength] = useState<number>(application?.content.trim().length ?? 0)
    const minLimit: number = 500
    const maxLimit: number = 2500

    const { handleSubmit, register, watch, formState: { errors } } = useForm<EditApplicationInput>({
        defaultValues: {
            companyName: application?.companyName,
            email: application?.email,
            applicationStatus: application?.applicationStatus,
            position: application?.position,
            content: application?.content
        }
    })

    const companyNameInputValue = watch("companyName")
    const emailInputValue = watch("email")
    const positionInputValue = watch("position")
    const contentInputValue = watch("content")

    const onSubmit = (data: EditApplicationInput) => {
        editApplication.mutate({
            companyName: data.companyName,
            email: data.email,
            applicationStatus: applicationStatus,
            position: data.position,
            content: data.content,
        })
    }

    const selectStatus = (status: ApplicationStatus) => {
        setApplicationStatus(status)
    }

    return (
        <OverlayWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Title className="flex justify-center text-blue-400 mb-3 text-2xl tracking-tighter font-bold">Edit Application</Dialog.Title>
                <Dialog.Description
                    className="flex justify-center text-sm mb-5 font-bold">
                    Enter the details of the application you want to edit
                </Dialog.Description>

                <div className="flex flex-col gap-3">
                    <label className="mb-3">
                        <p>
                            Name
                        </p>
                        <Input
                            className="w-full bg-gray-100"
                            defaultValue=""
                            placeholder="Enter the name of the company"
                            {...register("companyName", {
                                required: "Company name is required"
                            })}
                        />
                        {errors.companyName && <p className="text-red-400">{errors.companyName.message}</p>}

                    </label>
                    <label className="mb-3">
                        <p>
                            Email
                        </p>
                        <Input
                            className="w-full bg-gray-100"
                            placeholder="Enter the email of the company"
                            {...register("email", {
                                required: "Company email is required"
                            })}
                        />
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                    </label>
                    <label className="mb-3">
                        <p className="flex gap-1">
                            Application Status:
                            <p className={`font-bold  ${applicationStatus != "Select status" ? "rounded-full py-1 px-2 text-[12px] " : ""} ${statusColorMap[applicationStatus as ApplicationStatus] ?? "text-black"}`}>
                                {applicationStatus}
                            </p>
                        </p>

                        <div className="p-3" />

                        <StatusDropdownMenu
                            selectStatus={selectStatus}
                            isOpen={isDropDownOpen}
                            onOpenChange={setIsDropdownOpen}
                            trigger={
                                <Button
                                    className="w-fit"
                                    variant="light"
                                    size="small"
                                    type="button"
                                >
                                    Add status
                                </Button>
                            }
                        />
                    </label>
                    <label className="mb-3">
                        <p>
                            Position
                        </p>
                        <Input
                            className="w-full bg-gray-100"
                            defaultValue=""
                            placeholder="Enter the position you are applying for"
                            {...register("position", {
                                required: "Position is required!"
                            })}
                        />
                        {errors.position && <p className="text-red-400">{errors.position.message}</p>}
                    </label>

                    <label className="mb-3">
                        <p>
                            Content
                        </p>
                        <textarea className="w-full bg-gray-100 h-50 rounded-xl p-3"
                            {...register("content", {
                                required: "Content is required!"
                            })}
                            onChange={(e) => setCurrentLength(e.target.value.length)}
                        />

                        <div className="flex justify-center gap-1">
                            {currentLength <= maxLimit ? 
                                <div>
                                    <CurrentTextLength currentLength={currentLength} />
                                </div>

                                : <p className="text-red-400 text-xs">
                                    -{currentLength - maxLimit}
                                </p>
                            }

                            {currentLength < maxLimit &&
                                <div>
                                    <ProgressCircle
                                        maxValue={2500}
                                        value={currentLength}
                                        className={currentLength < minLimit ? "text-red-400" : "text-green-400"}
                                    />
                                </div>
                            }

                        </div>
                        
                        {errors.content && <p className="text-red-400">{errors.content.message}</p>}
                    </label>
                </div>

                <div className="p-3" />

                <div className="flex justify-end gap-5 md:gap-10" >
                    <Dialog.Close asChild>
                        <Button
                            variant="light"
                            size="small">
                            Cancel
                        </Button>
                    </Dialog.Close>

                    <Button
                        type="submit"
                        isPending={editApplication.isPending}
                        disabled={!applicationStatus || !companyNameInputValue || !emailInputValue || !contentInputValue ||
                            currentLength < minLimit || currentLength > maxLimit}
                        onClick={() => {
                            console.log("New content:")
                            console.log(contentInputValue)

                            editApplication.mutate({
                                companyName: companyNameInputValue,
                                email: emailInputValue,
                                applicationStatus: applicationStatus,
                                position: positionInputValue,
                                content: contentInputValue
                            })
                        }}
                        size="small"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </OverlayWrapper>
    )
}