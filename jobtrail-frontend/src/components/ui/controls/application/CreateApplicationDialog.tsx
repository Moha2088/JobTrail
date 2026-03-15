import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { Flex, TextField } from "@radix-ui/themes/dist/cjs/components/index.js"
import { usePostApplication } from "@/services/applications"
import { useForm } from "react-hook-form"
import { ApplicationStatus, StatusDropdownMenu } from "@/components/ui/controls/application/StatusDropdownMenu"
import { useState } from "react"

interface CreateApplicationDialogProps {
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
}


export function CreateApplicationDialog(props: CreateApplicationDialogProps) {
    const { isOpen, onOpenChange } = props

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            < Content />
        </Dialog.Root>
    )
}

type CreateApplicationInput = {
    companyName: string
    email: string
    applicationStatus: string
    position: string
}

function Content() {
    const createApplication = usePostApplication()

    const [isDropDownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [applicationStatus, setApplicationStatus] = useState<string>("")

    const { handleSubmit, register, reset, getValues, formState: { errors } } = useForm<CreateApplicationInput>({
        defaultValues: {
            companyName: "",
            email: "",
            applicationStatus: "",
            position: ""
        }
    })

    const onSubmit = (data: CreateApplicationInput) => {
        createApplication.mutate({
            companyName: data.companyName,
            email: data.email,
            applicationStatus: applicationStatus,
            position: data.position
        }, {
            onSuccess: () => {
                console.log("Application created successfully")
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
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Content className="mr-auto ml-auto w-200 bg-white p-5 rounded-xl z-10 absolute right-0 left-0">
                    <Dialog.Title className="mb-3 text-2xl font-bold">Create Application</Dialog.Title>
                    <div className="p-2" />
                    <Dialog.Description
                        className="mb-5">
                        Enter the details of the application you want to create
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <p>
                                Name
                            </p>
                            <TextField.Root
                                className="w-100"
                                defaultValue=""
                                placeholder="Enter the name of the company"
                                {...register("companyName", {
                                    required: "Company name is required"
                                })}
                            />
                            {errors.companyName && <p className="text-red-400">{errors.companyName.message}</p>}

                        </label>
                        <label>
                            <p>
                                Email
                            </p>
                            <TextField.Root
                                className="w-100"
                                placeholder="Enter the email of the company"
                                {...register("email", {
                                    required: "Company email is required"
                                })}
                            />
                            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                        </label>
                        <label>
                            <p className="flex gap-1">
                                Application Status:
                                <p className="inline-block font-bold">
                                    {applicationStatus ? applicationStatus : "Select status"}
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
                        <label>
                            <p>
                                Position
                            </p>
                            <TextField.Root
                                className="w-100"
                                defaultValue=""
                                placeholder="Enter the position you are applying for"
                                {...register("position", {
                                    required: "Position is required!"
                                })}
                            />
                            {errors.position && <p className="text-red-400">{errors.position.message}</p>}
                        </label>
                    </Flex>

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
                            onClick={() => {
                                reset()
                            }}
                        >
                            <Button
                                disabled={!applicationStatus || !getValues("companyName") || !getValues("email") || !getValues("position")}
                                type="submit"
                                onClick={() => {
                                    createApplication.mutate({
                                        companyName: getValues("companyName"),
                                        email: getValues("email"),
                                        applicationStatus: applicationStatus,
                                        position: getValues("position")
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
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </form>
        </>
    )
}