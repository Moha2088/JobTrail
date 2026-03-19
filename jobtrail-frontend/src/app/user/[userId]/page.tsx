"use client"

import { Button } from "@/components/ui/controls/Button"
import { useSession } from "@/services/session/useSession"
import { useUser } from "@/services/users/useUser"
import { IconTrash, IconUser } from "@tabler/icons-react"
import { useEffect } from "react"


export default function UserPage(){
    const { data } = useSession()
    

    return (
        <div>
            <div className="bg-black h-50" />
            <div className="flex flex-col gap-5 items-center">
                <div className="bg-white border-3 p-7 rounded-full  absolute top-32">
                    <IconUser size={90} />
                </div>

                <div className="font-bold text-2xl mt-25">
                    {data?.name}
                </div>

                <div>
                    {data?.email}
                </div>
                
                <div>
                    Account created: 
                </div>

                <div>
                    <div>
                        <Button
                            variant="destructive"
                            className=""
                        >
                            <IconTrash />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}