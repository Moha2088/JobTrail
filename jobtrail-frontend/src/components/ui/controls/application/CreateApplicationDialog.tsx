import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { usePostApplication } from "@/services/applications"
import { useForm } from "react-hook-form"
import { ApplicationStatus, StatusDropdownMenu } from "@/components/ui/controls/application/StatusDropdownMenu"
import { OverlayWrapper } from "../OverlayWrapper"
import { useState } from "react"
import { Input } from "../Input"
import { DialogProps } from "@radix-ui/react-dialog"
import { CurrentTextLength } from "../../view/applications/CurrentTextLength"

interface CreateApplicationDialogProps extends DialogProps{

}


export function CreateApplicationDialog(props: CreateApplicationDialogProps) {
    const { open, onOpenChange } = props

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Content onOpenChange={onOpenChange} />
        </Dialog.Root>
    )
}

type CreateApplicationInput = {
    companyName: string
    email: string
    applicationStatus: string
    position: string
    content: string
}

interface ContentProps {
    onOpenChange?: (value: boolean) => void
}

export const statusColorMap: Record<ApplicationStatus, string> = {
    ACCEPTED: "text-green-600 bg-green-100",
    REJECTED: "text-red-600 bg-red-100",
    PENDING: "text-yellow-600 bg-yellow-100",
    OFFER: "text-orange-600 bg-orange-100"
}

function Content(props: ContentProps) {
    const { onOpenChange } = props
    const createApplication = usePostApplication()

    const [isDropDownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [applicationStatus, setApplicationStatus] = useState<string>("Select status")
    const [currentLength, setCurrentLength] = useState<number>(0)

    const { handleSubmit, register, getValues, formState: { errors } } = useForm<CreateApplicationInput>({
        defaultValues: {
            companyName: "",
            email: "",
            applicationStatus: "",
            position: "",
            content: ""
        }
    })

    const onSubmit = (data: CreateApplicationInput) => {
        createApplication.mutate({
            companyName: data.companyName,
            email: data.email,
            applicationStatus: applicationStatus,
            position: data.position,
            content: data.content
        }, {
            onSuccess: () => {
                console.log("Application created successfully")
                onOpenChange?.(false)
            },
            
            onError: () => {
                alert("Failed to create application")
            }
        })
    }

    const selectStatus = (status: ApplicationStatus) => {
        setApplicationStatus(status)
    }

    return (
        <OverlayWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Title className="flex justify-center mb-3 text-2xl text-blue-400 tracking-tighter font-bold">Create Application</Dialog.Title>
                <Dialog.Description className="flex justify-center font-bold text-sm mb-5">
                    Enter the details of the application you want to create
                </Dialog.Description>

                <div className="flex flex-col gap-3">
                    <label className="mb-3">
                        <p>
                            Name
                        </p>
                        <Input
                            className="w-100 bg-gray-100 text-sm"
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
                            className="w-100 bg-gray-100 text-sm"
                            placeholder="Enter the email of the company"
                            {...register("email", {
                                required: "Company email is required"
                            })}
                        />
                        
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}

                    </label>
                    <label className="mb-3">
                        <div className="flex gap-2">
                            <div>
                                <p className="flex gap-1 mb-3">
                                    Application Status:
                                </p>
                            </div>

                            <div>
                                <p className={`font-bold  ${applicationStatus != "Select status" ? "rounded-full py-1 px-2 text-[12px] " : ""} ${statusColorMap[applicationStatus as ApplicationStatus] ?? "text-black"}`}>
                                    {applicationStatus ? applicationStatus : "Select status"}
                                </p>
                            </div>
                        </div>

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
                            className="w-100 bg-gray-100 text-sm"
                            defaultValue=""
                            placeholder="Enter the position you are applying for"
                            {...register("position", {
                                required: "Position is required!"
                            })}
                        />
                        {errors.position && <p className="text-red-400">{errors.position.message}</p>}
                    </label>

                    <label>
                        <p>
                            Content
                        </p>
                        <textarea className="w-100 bg-gray-100 h-50 rounded-xl p-3 text-sm"
                            {...register("content", {
                                required: "Content is required!"
                            })}
                            onChange={(e) => setCurrentLength(e.target.value.length)}
                        />

                        <div className="flex justify-center">
                            <CurrentTextLength currentLength={currentLength} />    
                        </div>
                        {errors.content && <p className="text-red-400">{errors.content.message}</p>}
                    </label>
                </div>

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
                        disabled={!applicationStatus || getValues("companyName") === "" || getValues("email") === "" || getValues("position") === "" || getValues("content") === "" || currentLength < 100}
                        type="submit"
                        isPending={createApplication.isPending}
                        size="small"
                    >
                        Save
                    </Button>
                </div>   
            </form>
        </OverlayWrapper>
    )
}