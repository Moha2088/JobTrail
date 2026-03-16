"use client"

import { CreateApplicationDialog } from "@/components/ui/controls/application/CreateApplicationDialog"
import { Button } from "@/components/ui/controls/Button"
import { ApplicationTable } from "@/components/ui/view/applications/ApplicationTable"
import { Metrics } from "@/components/ui/view/applications/Metrics"
import { useApplications } from "@/services/applications"
import { useLogOut } from "@/services/auth/useLogOut"
import { IconLogout, IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSessionContext } from "@/contexts/session/SessionContext"


export default function ApplicationsPage() {
    const [isCreateApplicationDialogOpen, setIsCreateApplicationDialogOpen] = useState<boolean>(false)

    const applications = useApplications().data
    const logOut = useLogOut()

    const pendingCount = applications?.metrics.pendingCount ?? 0
    const rejectedCount = applications?.metrics.rejectedCount ?? 0
    const acceptedCount = applications?.metrics.acceptedCount ?? 0

    const router = useRouter()
    const session = useSessionContext()

    return (
        <div className={`h-screen ${isCreateApplicationDialogOpen ? "bg-black/70": ""} `}>
            <div className="p-5" />

            <div className="flex flex-row justify-end">

                <div className="flex justify-start items-center w-screen">
                    <p className=" text-2xl font-bold ml-20">
                        Welcome back, {session?.name}!
                    </p>
                </div>

                <div className="flex mr-10 gap-3">
                    <div>
                        <Button
                            className="w-fit"
                            size="small"
                            onClick={() => setIsCreateApplicationDialogOpen(true)}
                            iconEnd={<IconPlus />}
                        >
                            Create
                        </Button>
                    </div>

                    <div>
                        <Button
                            size="small"
                            onClick={async() => logOut.mutate(undefined, {
                                onSuccess: () => {
                                    console.log("Logging out!")
                                    router.replace("/")
                                }
                            })}
                            variant="destructive"
                            iconEnd={<IconLogout />}
                            className=""
                        >
                            Log Out
                        </Button>
                    </div>
                </div>                
            </div>

            <CreateApplicationDialog 
                isOpen={isCreateApplicationDialogOpen} 
                onOpenChange={setIsCreateApplicationDialogOpen}
            />

            <div className="p-5" />

            <Metrics
                pendingCount={pendingCount ?? 0}
                rejectedCount={rejectedCount ?? 0}
                acceptedCount={acceptedCount ?? 0}
            />

            <div className="p-10" />

            <ApplicationTable
                applications={applications?.applications}
            />
        </div>
    )
}