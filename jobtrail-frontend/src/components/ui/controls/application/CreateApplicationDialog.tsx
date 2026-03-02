import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { Flex, TextField } from "@radix-ui/themes/dist/cjs/components/index.js"
import { usePostApplication } from "@/services/applications"
import { useForm } from "react-hook-form"


interface CreateApplicationDialogProps {
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

export function CreateApplicationDialog(props: CreateApplicationDialogProps) {
    const { isOpen, onOpenChange } = props


    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Content />
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

    const { handleSubmit, register, reset } = useForm<CreateApplicationInput>({
        defaultValues: {
            companyName: "",
            email: "",
            applicationStatus: "",
            position: ""
        }
    })

    const onSubmit = (data: CreateApplicationInput) => {
        alert("Creating application...")
        createApplication.mutate({
            companyName: data.companyName,
            email: data.email,
            applicationStatus: data.applicationStatus,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Content className="mr-auto ml-auto w-150 bg-gray-100 p-5 rounded-xl absolute right-0 left-0">
                <Dialog.Title className="mb-3 text-lg font-bold">Create Application</Dialog.Title>
                <Dialog.Description
                    className="font-bold mb-5">
                    Enter the details of the application you want to create
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <p>
                            Name
                        </p>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the name of the company"
                            {...register("companyName")}
                        />
                    </label>
                    <label>
                        <p>
                            Email
                        </p>
                        <TextField.Root
                            placeholder="Enter the email of the company"
                            {...register("email")}
                        />
                    </label>
                    <label>
                        <p>
                            Application Status
                        </p>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the status of the application"
                            {...register("applicationStatus")}
                        />
                    </label>
                    <label>
                        <p>
                            Position
                        </p>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Enter the position you are applying for"
                            {...register("position")}
                        />
                    </label>
                </Flex>

                <div className="flex justify-end gap-10" >
                    <Dialog.Close>
                        <Button
                            size="small">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close
                        onClick={() => {
                            reset()
                        }}
                    >
                        <Button
                            size="small"
                            type="submit"
                        >
                            Create application
                        </Button>
                    </Dialog.Close>
                </div>
            </Dialog.Content>
        </form>
    )
}