"use client"

import { CreateApplicationDialog } from "@/components/ui/controls/application/CreateApplicationDialog"
import { Button } from "@/components/ui/controls/Button"
import { ApplicationTable } from "@/components/ui/view/applications/ApplicationTable"
import { useApplications } from "@/services/applications"
import { useDeleteApplication } from "@/services/applications"
import { useLogOut } from "@/services/auth/useLogOut"
import { IconLogout, IconPlus } from "@tabler/icons-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


export default function Page() {
    const [applicationToDelete, setApplicationToDelete] = useState<number | null>(null)
    const [isCreateApplicationDialogOpen, setIsCreateApplicationDialogOpen] = useState<boolean>(false)


    const deleteApplication = useDeleteApplication(applicationToDelete!)

    const applications = useApplications().data

    const logOut = useLogOut()

    const router = useRouter()

    const getApplicationid = (id: number) => {
        setApplicationToDelete(id)
        deleteApplication.mutate(undefined, {
            onSuccess: () => {
                console.log("Application deleted successfully")
            },
            onError: () => {
                console.log("Error deleting application")
            }
        })
    }

    return (
        <>
            <div className="p-5" />

            <div className="flex flex-row justify-end">
                <div className="flex  mr-5">
                    <Button
                        className="w-fit"
                        onClick={() => setIsCreateApplicationDialogOpen(true)}
                        iconEnd={<IconPlus />}
                    >
                        Create application
                    </Button>
                </div>

                <div className="flex  mr-5">
                    <Button 
                        onClick={async() => logOut.mutate(undefined, {
                            onSuccess: () => {
                                console.log("Logging out!")
                                router.refresh()
                                toast.info("You have successfully logged out!", {
                                    
                                })
                            }
                        })}
                        variant="destructive"
                        iconEnd={<IconLogout size={25} />}
                        className={`w-35`}
                    >
                        Log Out
                    </Button>
                </div>
            </div>

            <CreateApplicationDialog 
                isOpen={isCreateApplicationDialogOpen} 
                onOpenChange={setIsCreateApplicationDialogOpen} 
            />

            <div className="p-5" />

            <div>
                <p className=" text-2xl font-bold ml-20">
                    Applications
                </p>
            </div>

            <div className="p-5" />

            <div className="flex justify-center flex-row gap-3">
                <div className="border-2 p-2 w-fit rounded-xl shadow-2xl font-bold">
                    test
                </div>

                <div className="border-2 p-2 w-fit rounded-xl shadow-2xl font-bold">
                    test
                </div>

                <div className="border-2 p-2 w-fit rounded-xl shadow-2xl font-bold">
                    test
                </div>    
            </div>
            

            <div className="p-5" />

            <ApplicationTable
                deleteApplication={getApplicationid}
                applications={applications } />
        </>
    )
}