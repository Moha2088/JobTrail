import { Dialog } from "radix-ui"
import { Button } from "../Button"
import { useForm } from "react-hook-form"
import { ApplicationStatus, StatusDropdownMenu } from "@/components/ui/controls/application/StatusDropdownMenu"
import { OverlayWrapper } from "../OverlayWrapper"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/controls/Input"
import { DialogProps } from "@radix-ui/react-dialog"
import { useUserContext } from "@/contexts/user/UserContext"
import { usePutUser } from "@/services/users/usePutUser"

interface EditUserDialogProps extends DialogProps{

}


export function EditUserDialog(props: EditUserDialogProps) {
    const { open, onOpenChange } = props

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Content onOpenChange={onOpenChange} />
        </Dialog.Root>
    )
}

type EditUserInput = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

interface ContentProps {
    onOpenChange?: (open: boolean) => void
}


function Content(props: ContentProps) {
    const { onOpenChange } = props

    const { user } = useUserContext()

    const editUser = usePutUser(user?.id)

    const { handleSubmit, register, reset, getValues, formState: { errors } } = useForm<EditUserInput>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (data: EditUserInput) => {
        console.log("Entered edit function")

        editUser.mutate({
            name: data.name,
            email: data.email,
            password: data.password
        }, {
            onSuccess: () => {
                console.log("Application updated successfully")
                onOpenChange?.(false)
            },

            onError: () => {
                alert("Failed to update application")
            }
        })
    }

    return (
        <OverlayWrapper>
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Title className="flex justify-center text-blue-400 mb-3 text-2xl tracking-tighter font-bold">Edit User</Dialog.Title>
                <Dialog.Description
                    className="flex justify-center text-sm mb-5 font-bold">
                    Enter the new details for your user account below.
                </Dialog.Description>

                <div className="flex flex-col gap-3">
                    <label className="mb-3">
                        <p>
                            Name
                        </p>
                        <Input
                            className="w-100 bg-gray-100"
                            defaultValue=""
                            placeholder="Enter the name of the user"
                            {...register("name", {
                                required: "Name is required"
                            })}
                        />
                        {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

                    </label>
                    <label className="mb-3">
                        <p>
                            Email
                        </p>
                        <Input
                            className="w-100 bg-gray-100"
                            placeholder="Enter the email of the user"
                            {...register("email", {
                                required: "Email is required"
                            })}
                        />
                        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                    </label>
                    <label className="mb-3">
                        <p>
                            Password
                        </p>
                        <Input
                            className="w-100 bg-gray-100"
                            defaultValue=""
                            type="password"
                            placeholder="Enter the password for the user"
                            {...register("password", {
                                required: "Password is required!"
                            })}
                        />
                        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                    </label>

                    <label className="mb-3">
                        <p>
                            Confirm password
                        </p>
                        <Input
                            className="w-100 bg-gray-100"
                            defaultValue=""
                            type="password"
                            placeholder="Confirm the password for the user"
                            {...register("confirmPassword", {
                                required: "Confirmed password is required!",
                                validate: (value) => value === getValues("password") || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>}
                    </label>
                </div>

                <div className="flex justify-end gap-10" >
                    <Dialog.Close asChild>
                        <Button
                            type="button"
                            variant="light"
                            size="small">
                            Cancel
                        </Button>
                    </Dialog.Close>

                    <Button size="small" >
                        Save
                    </Button>
                </div>
            </form>
        </OverlayWrapper>
    )
}