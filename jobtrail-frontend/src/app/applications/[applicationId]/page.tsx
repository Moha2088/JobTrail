"use client"

import { DeleteApplicationDialog } from "@/components/ui/controls/application/DeleteApplicationDialog"
import { EditApplicationDialog } from "@/components/ui/controls/application/EditApplicationDialog"
import { Button } from "@/components/ui/controls/Button"
import { ApplicationContext } from "@/contexts/application/ApplicationContext"
import { useApplication } from "@/services/applications/useApplication"
import { IconEdit, IconSparkles, IconTrash } from "@tabler/icons-react"
import { notFound, useParams } from "next/navigation"
import { useState } from "react"
import { QuickTip } from "@/components/ui/view/QuickTip"


export default function Page() {
    const { applicationId } = useParams()

    const application = useApplication(Number(applicationId))
    const { data } = application

    const [isEditApplicationDialogOpen, setIsEditApplicationDialogOpen] = useState<boolean>(false)
    const [isDeleteApplicationDialogOpen, setIsDeleteApplicationDialogOpen] = useState<boolean>(false)

    if(application.isError) {
        notFound()
    }

    return (
        <>
            <QuickTip>
                Not satisfied with the content? Click on the sparkles button at the top, to enhance it with AI.
            </QuickTip>

            <ApplicationContext value={{ applicationId: Number(applicationId) }}>
                <EditApplicationDialog 
                    isOpen={isEditApplicationDialogOpen}
                    onOpenChange={() => setIsEditApplicationDialogOpen(true)} 
                />

                <DeleteApplicationDialog 
                    isOpen={isDeleteApplicationDialogOpen}
                    onOpenChange={() => setIsDeleteApplicationDialogOpen(true)}
                />
            </ApplicationContext>

            <div className={`flex flex-row justify-center items-center gap-30 ${isEditApplicationDialogOpen} ? "bg-black/70" : ""`}>
                {data?.content &&
                    <div>
                        <div className="flex flex-col p-3 max-w-150 overflow-y-scroll h-screen gap-5">
                            <label className="mr-auto ml-auto w-fit pl-5 pr-5 p-2 rounded-2xl mb-5 bg-gray-100 font-bold text-xl">
                                Content
                            </label>

                            <div className="flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="small"
                                    iconStart={<IconSparkles />}
                                    className="w-20"
                                >

                                </Button>
                            </div>
                            
                            <div className="mr-auto ml-auto">
                                <p>{data.content}</p>
                            </div>
                        </div>
                    </div>
                }

                <div className="">
                    <div className="mb-10">
                        <p className="flex justify-center text-4xl font-bold">
                            {data?.companyName}
                        </p>
                    </div>

                    <div className=" bg-gray-50 mr-auto ml-auto w-fit p-5 mb-5 rounded-xl">

                        <div className="flex justify-center p-3">
                            <label className="font-bold pr-1">Email:</label>
                            <p>{data?.email}</p>
                        </div>
                        
                        <div className="flex justify-center p-3">
                            <label className="font-bold pr-1">Application Status:</label>
                            <p>{data?.applicationStatus}</p>
                        </div>
                        
                        <div className="flex justify-center p-3">
                            <label className="font-bold pr-1">Position:</label>
                            <p>{data?.position}</p>
                        </div>

                        <div className="flex justify-center mb-10 p-3">
                            <label className="font-bold pr-1">Created At:</label>
                            <p>{data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-5 justify-center">
                        <div>
                            <Button
                                className=""
                                size="small"
                                onClick={() => setIsEditApplicationDialogOpen(true)}
                            >
                                <IconEdit size={20} />
                            </Button>
                        </div>

                        <div>
                            <Button
                                size="small"
                                variant="destructive"
                                onClick={() => setIsDeleteApplicationDialogOpen(true)}
                            >
                                <IconTrash color="white" />
                            </Button>
                        </div>
                    </div>
                </div>       
            </div>
        </>

        

    )
}