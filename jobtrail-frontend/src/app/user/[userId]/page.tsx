"use client"

import { Button } from "@/components/ui/controls/Button"
import { useSession } from "@/services/session/useSession"
import { useDeleteUser } from "@/services/users/useDeleteUser"
import { useUser } from "@/services/users/useUser"
import { IconBrandOpenai, IconClockHour3, IconEdit, IconMail, IconTrash, IconUser } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"
import { Provider } from "@/app/applications/[applicationId]/page"
import { useEffect, useState } from "react"
import { Toggle } from "@/components/ui/controls/ai/Toggle"
import { BsAnthropic } from "react-icons/bs"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { DeleteUserDialog } from "@/components/ui/controls/user/DeleteUserDialog"
import { EditUserDialog } from "@/components/ui/controls/user/EditUserDialog"
import { UserContext } from "@/contexts/user/UserContext"


export default function UserPage(){
    const { data } = useSession()
    const { data: userData, isLoading } = useUser(Number(data?.userId))

    const [currentProvider, setCurrentProvider] = useState<Provider>()

    const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState<boolean>(false)
    const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState<boolean>(false)

    const { setItem, getItem } = useLocalStorage<Provider>("defaultProvider")

    useEffect(() => {
        const storedDefaultProvider = getItem()
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentProvider(storedDefaultProvider)
    }, [])

    const setProvider = (provider: Provider) => {
        setItem(provider)
        setCurrentProvider(provider)
    }

    if(isLoading) {
        return(
            <div className="flex justify-center items-center h-screen">
                <LoadingDots />
            </div>
        )
    }

    if(!userData) {
        return null
    }

    return (
        <div>
            {userData &&
                <UserContext value={{ user: userData }}>
                    <EditUserDialog 
                        open={isEditUserDialogOpen}
                        onOpenChange={setIsEditUserDialogOpen}
                    />

                    <DeleteUserDialog
                        open={isDeleteUserDialogOpen}
                        onOpenChange={setIsDeleteUserDialogOpen}
                    />
                </UserContext>
            }

            <div className="bg-black h-35" />
            <div className="flex flex-col gap-5 items-center">
                <div className="bg-white border-3 p-7 rounded-full absolute top-15">
                    <IconUser size={90} />
                </div>

                <div className="font-bold text-xl mt-25">
                    {data?.name}
                </div>

                <div>
                    <p>
                        Default Provider
                    </p>
                </div>

                <div className="flex gap-3 mb-5">
                    <Toggle
                        setProvider={setProvider}
                        current={currentProvider!}
                        text="anthropic"
                    >
                        <BsAnthropic size={20} />
                    </Toggle>

                    <Toggle
                        setProvider={setProvider}
                        current={currentProvider!}
                        text="openai"
                    >
                        <IconBrandOpenai size={20} />
                    </Toggle>
                </div>

                <div className="flex flex-col max-w-200 gap-5 mb-5">
                    <div className="flex flex-row gap-2">

                        <div>
                            <IconMail size={30} />
                        </div>

                        <div className="pt-1">
                            {data?.email}
                        </div>

                    </div>

                    <div className="flex flex-row gap-2">

                        <div>
                            <IconClockHour3 size={30} />
                        </div>

                        <div className="pt-1">
                            Account created: {new Date(userData.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-5">
                    <div>
                        <Button
                            size="small"
                            className="w-20"
                            onClick={() => setIsEditUserDialogOpen(true)}
                        >
                            <IconEdit />
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="small"
                            variant="destructive"
                            className="w-20"
                            onClick={() => setIsDeleteUserDialogOpen(true)}
                        >
                            <IconTrash />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}