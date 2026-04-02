import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { Flex, TextField } from "@radix-ui/themes/dist/cjs/components/index.js"
import { usePostApplication } from "@/services/applications"
import { useForm } from "react-hook-form"
import { ApplicationStatus, StatusDropdownMenu } from "@/components/ui/controls/application/StatusDropdownMenu"
import { OverlayWrapper } from "../OverlayWrapper"
import { useEffect, useState } from "react"
import { get } from "http"
import { Input } from "../Input"
import { DialogProps } from "@radix-ui/react-dialog"

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

function Content(props: ContentProps) {
    const { onOpenChange } = props
    const createApplication = usePostApplication()

    const [isDropDownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [applicationStatus, setApplicationStatus] = useState<string>("")

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
            content: data.content,
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
                <Dialog.Title className="mb-3 text-2xl font-bold">Create Application</Dialog.Title>
                <div className="p-2" />
                <Dialog.Description
                    className="mb-5">
                    Enter the details of the application you want to create
                </Dialog.Description>

                <div className="flex flex-col gap-3">
                    <label className="mb-3">
                        <p>
                            Name
                        </p>
                        <Input
                            className="w-100"
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
                            className="w-100"
                            placeholder="Enter the email of the company"
                            {...register("email", {
                                required: "Company email is required"
                            })}
                        />
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                    </label>
                    <label className="mb-3">
                        <p className="flex gap-1 mb-3">
                            Application Status:
                            <p className="inline-block font-bold">
                                {applicationStatus ? applicationStatus : "Select status"}
                            </p>
                        </p>

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
                            className="w-100"
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
                        <textarea className="w-100 h-50 border-2"
                            {...register("content", {
                                required: "Content is required!"
                            })} 
                        />
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
                        disabled={!applicationStatus || getValues("companyName") === "" || getValues("email") === "" || getValues("position") === "" || getValues("content") === ""}
                        onClick={() => {
                            createApplication.mutate({
                                companyName: getValues("companyName"),
                                email: getValues("email"),
                                applicationStatus: applicationStatus,
                                position: getValues("position"),
                                content: getValues("content")
                            }, {
                                onSuccess: () => {
                                    console.log("Application created successfully")

                                },

                                onError: () => {
                                    alert("Failed to create application")
                                }
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