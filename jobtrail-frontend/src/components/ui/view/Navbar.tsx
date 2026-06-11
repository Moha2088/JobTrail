"use client"

import { useSessionContext } from "@/contexts/session/SessionContext"
import { IconLogout, IconUser } from "@tabler/icons-react"
import Link from "next/link"
import { Button } from "../controls/Button"
import { useLogOut } from "@/services/auth/useLogOut"
import { usePathname, useRouter } from "next/navigation"


export function Navbar() {
    const pathname = usePathname()
    const session = useSessionContext()
    const logOut = useLogOut()
    const router = useRouter()

    return (
        <div>
            {session && pathname != "/" &&
                <div className="flex absolute justify-end items-center w-full gap-1 p-3 pr-4 md:pr-10">
                    {!pathname.startsWith("/user") && 
                        <div className="p-2 mr-3 border-gray-100 border-2 rounded-full">
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