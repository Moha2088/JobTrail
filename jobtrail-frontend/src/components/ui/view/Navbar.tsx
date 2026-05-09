"use client"

import { useSessionContext } from "@/contexts/session/SessionContext"
import { IconLogout, IconUser } from "@tabler/icons-react"
import Link from "next/link"
import router from "next/router"
import { Button } from "../controls/Button"
import { useLogOut } from "@/services/auth/useLogOut"
import { usePathname } from "next/navigation"


export function Navbar() {
    const pathname = usePathname()
    const session = useSessionContext()
    const logOut = useLogOut()

    return (
        <div>
            {session &&
                <div className="flex absolute justify-end items-center w-screen mr-10 gap-1 p-3 ">
                    {!pathname.startsWith("/user") && 
                        <div className="p-2 mr-3 border-gray-100 border-2 rounded-full hover:bg-gray-200">
                            <Link href={`/user/${session?.userId}`}>
                                <IconUser size={28} />
                            </Link>
                        </div>
                    }

                    <div>
                        <Button
                            size="small"
                            onClick={async() => logOut.mutate(undefined, {
                                onSuccess: () => {
                                    router.replace("/")
                                }
                            })}
                            variant="ghost"
                            iconEnd={<IconLogout color="red" />}
                            className="w-fit"
                        >
                            
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}