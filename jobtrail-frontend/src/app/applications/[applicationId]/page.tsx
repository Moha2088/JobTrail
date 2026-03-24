"use client"

import { DeleteApplicationDialog } from "@/components/ui/controls/application/DeleteApplicationDialog"
import { EditApplicationDialog } from "@/components/ui/controls/application/EditApplicationDialog"
import { Button } from "@/components/ui/controls/Button"
import { ApplicationContext } from "@/contexts/application/ApplicationContext"
import { useApplication } from "@/services/applications/useApplication"
import { IconCheck, IconEdit, IconSparkles, IconTrash } from "@tabler/icons-react"
import { notFound, useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { QuickTip } from "@/components/ui/view/QuickTip"
import { useCompletion } from "@ai-sdk/react"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"
import { StreamedTextOutput } from "@/components/ui/view/ai/StreamedTextOutput"
import { createPrompt } from "@/providers/openAIProvider"
import { ActionButton } from "@/components/ui/controls/ai/ActionButton"
import { usePutApplication } from "@/services/applications"


export default function Page() {
    const { applicationId } = useParams()

    const application = useApplication(Number(applicationId))
    const { data } = application


    const  updateApplication = usePutApplication(data?.id || 0)

    const [isEditApplicationDialogOpen, setIsEditApplicationDialogOpen] = useState<boolean>(false)
    const [isDeleteApplicationDialogOpen, setIsDeleteApplicationDialogOpen] = useState<boolean>(false)

    if(application.isError) {
        notFound()
    }

    const {
        completion,
        handleSubmit,
        setInput,
        error,
        isLoading,
        setCompletion,
        stop
    } = useCompletion({
        streamProtocol: "text"
    })

    return (
        <>
            <QuickTip>
                Not satisfied with the content? Click on the <IconSparkles className="inline-block" /> button at the top, to enhance it with AI.
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
                            <label className="mr-auto ml-auto w-fit pl-5 pr-5 p-2 rounded-2xl bg-gray-100 font-bold text-xl">
                                Content
                            </label>

                            <div className="flex justify-center">
                                <Button
                                    onClick={() => {
                                        setInput(createPrompt(data?.content))
                                        handleSubmit()
                                    }}
                                    variant="ghost"
                                    size="small"
                                    iconStart={<IconSparkles />}
                                    className="w-20"
                                />
                            </div>

                            {isLoading &&
                                <div className="flex justify-center">
                                    <LoadingDots />
                                </div>
                            }

                            {completion && isLoading &&
                                <div className="flex justify-center">
                                    <ActionButton 
                                        variant="stop"
                                        onClick={stop} 
                                    />
                                </div>
                            }

                            {completion && !isLoading &&
                                <>
                                    <QuickTip>
                                        To keep changes, click the <ActionButton className="inline-block" variant="keep"/> button.<br />
                                        To discard changes, click the <ActionButton className="inline-block" variant="discard" /> button.
                                    </QuickTip>

                                    <div className="flex justify-center flex-row gap-2">
                                        <div>
                                            <ActionButton
                                                disabled={isLoading}
                                                variant="discard"
                                                onClick={() => setCompletion("")}
                                            />
                                        </div>

                                        <div>
                                            <ActionButton
                                                type="submit"
                                                disabled={isLoading} 
                                                variant="keep"
                                                onClick={() => updateApplication.mutate}
                                            />
                                        </div>
                                    </div>
                                </>
                            }

                            {completion &&
                                <StreamedTextOutput>
                                    {completion}
                                </StreamedTextOutput>
                            }

                            {!completion &&
                                <div className="mr-auto ml-auto">
                                    <p>{data.content}</p>
                                </div>
                            }

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