"use client"

import { Button } from "@/components/ui/controls/Button"
import { useSession } from "@/services/session/useSession"
import { useDeleteUser } from "@/services/users/useDeleteUser"
import { useUser } from "@/services/users/useUser"
import { IconClockHour3, IconEdit, IconMail, IconTrash, IconUser } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"


export default function UserPage(){
    const { data } = useSession()
    const { data: userData, isLoading } = useUser(Number(data?.userId))
    const deleteUser = useDeleteUser(Number(data?.userId))

    const router = useRouter()

    if(isLoading) {
        return(
            <div className="flex justify-center items-center h-screen">
                <LoadingDots />
            </div>
        )
    }

    return (
        <div>
            <div className="bg-black h-50" />
            <div className="flex flex-col gap-5 items-center">
                <div className="bg-white border-3 p-7 rounded-full absolute top-32">
                    <IconUser size={90} />
                </div>

                <div className="font-bold text-xl mt-25">
                    {data?.name}
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
                            Account created: {userData?.createdAt.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-5">
                    <div>
                        <Button
                            size="small"
                            className="w-20"
                            onClick={() => { }}
                        >
                            <IconEdit />
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="small"
                            variant="destructive"
                            className="w-20"
                            onClick={() => deleteUser.mutate(undefined, {
                                onSuccess: () => {
                                    router.push("/")
                                }
                            })}
                        >
                            <IconTrash />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}