"use client"

import { DeleteApplicationDialog } from "@/components/ui/controls/application/DeleteApplicationDialog"
import { EditApplicationDialog } from "@/components/ui/controls/application/EditApplicationDialog"
import { Button } from "@/components/ui/controls/Button"
import { ApplicationContext } from "@/contexts/application/ApplicationContext"
import { IconBrandOpenai, IconDownload, IconEdit, IconFileCv, IconSparkles, IconTrash, IconX, IconZoomExclamationFilled } from "@tabler/icons-react"
import { notFound, useParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { QuickTip } from "@/components/ui/view/QuickTip"
import { useCompletion } from "@ai-sdk/react"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"
import { StreamedTextOutput } from "@/components/ui/view/ai/StreamedTextOutput"
import { createContentPrompt } from "@/providers/openAIProvider"
import { ActionButton } from "@/components/ui/controls/ai/ActionButton"
import { usePutApplication, useApplication, usePatchContent } from "@/services/applications"
import { useUploadFile, useGetFile } from "@/services/applications/files"
import { useSession } from "@/services/session/useSession"
import { Toggle } from "@/components/ui/controls/ai/Toggle"
import { BsAnthropic } from "react-icons/bs"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { DeleteFileDialog } from "@/components/ui/controls/application/files/DeleteFileDialog"

export type Provider = "anthropic" | "openai"

export default function Page() {
    const { applicationId } = useParams()
    const parsedApplicationId = Number(applicationId)

    const application = useApplication(parsedApplicationId)
    const { data, isLoading: isApplicationLoading, isError } = application

    const patchContent = usePatchContent(parsedApplicationId)

    const { userId } = useSession()?.data || {}

    const [isEditApplicationDialogOpen, setIsEditApplicationDialogOpen] = useState<boolean>(false)
    const [isDeleteApplicationDialogOpen, setIsDeleteApplicationDialogOpen] = useState<boolean>(false)
    const [isDeleteFileDialogOpen, setIsDeleteFileDialogOpen] = useState<boolean>(false)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [currentProvider, setCurrentProvider] = useState<Provider>("openai")

    const fileUploadRef = useRef<HTMLInputElement>(null)

    const handleUpload = () => fileUploadRef?.current?.click()
    const onUpload =(event: ChangeEvent<HTMLInputElement>) => setSelectedFile(event?.target?.files![0] )

    const { data: fileData } = useGetFile(data?.key as string)
    const uploadFile = useUploadFile()


    const { getItem } = useLocalStorage<Provider>("defaultProvider")

    useEffect(() => {
        const storedDefaultProvider = getItem()

        if(storedDefaultProvider) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentProvider(storedDefaultProvider)
        }
    }, [])


    const {
        completion,
        handleSubmit,
        setInput,
        error,
        isLoading: isCompletionLoading,
        setCompletion,
        stop
    } = useCompletion({
        streamProtocol: "text",
        body: {
            currentProvider
        }
    })

    useEffect(() => {
        console.log("Completion:")
        console.log(completion)
    }, [completion])

    if (isApplicationLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingDots />
            </div>
        )
    }

    if (isError) {
        notFound()
    }

    return (
        <>

            <QuickTip>
                Not satisfied with the content? Click on the <IconSparkles className="inline-block" /> button at the top, to enhance it with AI.
            </QuickTip>


            <ApplicationContext value={{ application: data }}>
                <EditApplicationDialog 
                    open={isEditApplicationDialogOpen}
                    onOpenChange={setIsEditApplicationDialogOpen} 
                />

                <DeleteApplicationDialog 
                    open={isDeleteApplicationDialogOpen}
                    onOpenChange={setIsDeleteApplicationDialogOpen}
                />

                <DeleteFileDialog
                    open={isDeleteFileDialogOpen}
                    onOpenChange={setIsDeleteFileDialogOpen}
                />
            </ApplicationContext>

            <div className={`flex flex-row justify-center items-center gap-30 ${isEditApplicationDialogOpen} ? "bg-black/70" : ""`}>
                {data?.content &&
                    <div>
                        <div className="flex flex-col p-3 max-w-150 overflow-y-scroll h-screen gap-5">
                            <label className="mr-auto ml-auto w-fit pl-5 pr-5 p-2 rounded-2xl text-blue-400 tracking-tighter font-bold text-2xl">
                                Content
                            </label>

                            <div className="flex justify-center">
                                <Button
                                    onClick={() => {
                                        setInput(createContentPrompt(data!.content!))
                                        handleSubmit()
                                    }}
                                    variant="ghost"
                                    disabled={isCompletionLoading || data.content.length < 100}
                                    size="small"
                                    iconStart={<IconSparkles />}
                                    className="w-20"
                                />
                            </div>

                            <div className="flex justify-center gap-5 flex-col items-center">                                
                                <div className="flex gap-3">
                                    <Toggle 
                                        setProvider={setCurrentProvider} 
                                        text="anthropic"
                                        current={currentProvider}
                                    >
                                        <BsAnthropic size={20} />
                                    </Toggle>

                                    <Toggle 
                                        setProvider={setCurrentProvider} 
                                        text="openai"
                                        current={currentProvider} 
                                    >
                                        <IconBrandOpenai size={20} />
                                    </Toggle>
                                </div>

                            </div>

                            {data.content.length < 100 &&
                                <div className="p-2 rounded-full bg-red-400">
                                    <p className="text-white text-xs">
                                        AI optimization requires more content!.
                                    </p>
                                </div>
                            }

                            {error && 
                                <div className="p-2 rounded-full bg-red-400">
                                    <p className="text-white text-xs">
                                        {error.message}
                                    </p>
                                </div>
                            }

                            {isCompletionLoading &&
                                <div className="flex justify-center">
                                    <LoadingDots />
                                </div>
                            }

                            {completion && isCompletionLoading &&
                                <div className="flex justify-center">
                                    <ActionButton 
                                        variant="stop"
                                        onClick={stop} 
                                    />
                                </div>
                            }

                            {completion && !isCompletionLoading &&
                                <>
                                    <QuickTip>
                                        To keep changes, click the <ActionButton className="inline-block" variant="keep"/> button.<br />
                                        To discard changes, click the <ActionButton className="inline-block" variant="discard" /> button.
                                    </QuickTip>

                                    <div className="flex justify-center flex-row gap-2">
                                        <div>
                                            <ActionButton
                                                disabled={isCompletionLoading}
                                                variant="discard"
                                                onClick={() => setCompletion("")}
                                            />
                                        </div>

                                        <div>
                                            <ActionButton
                                                type="submit"
                                                disabled={isCompletionLoading}
                                                variant="keep"
                                                onClick={() => {
                                                    patchContent.mutate({
                                                        content: completion
                                                    })
                                                    
                                                    setCompletion("")
                                                }}
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

                {!data?.content &&
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center mb-5">
                                <IconZoomExclamationFilled />
                            </div>

                            <div className="text-sm mb-20">
                                <p>No Content was found. Click the edit button to add content.</p>
                            </div>
                        </div>
                        
                        <div>
                            <hr className="border h-screen"/>
                        </div>
                    </div>
                }

                <div>
                    <div className="mb-10 mt-10">
                        <p className="flex justify-center text-4xl font-bold text-blue-400 tracking-tighter">
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

                        <div className="flex justify-center mb-5 p-3">
                            <label className="font-bold pr-1">Created At:</label>
                            <p>{data?.createdAt ? new Date(data?.createdAt).toLocaleDateString() : "N/A"}</p>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                variant="ghost"
                                size="small"
                                className="w-20"
                                onClick={handleUpload}
                            >
                                <IconFileCv size={30}  />
                            </Button>
                        </div>

                        <div className="mb-5">
                            <input
                                ref={fileUploadRef}
                                type="file"
                                onChange={onUpload} 
                                className="hidden" 
                            />
                        </div>

                        {fileData && !fileData.includes("null") &&
                            <div className="mb-5">
                                <div className="flex justify-center mb-2">
                                    <div className="flex justify-center">
                                        <Button
                                            variant="ghost"
                                            size="small"
                                            className="w-fit"
                                        >
                                            <a href={fileData} download={selectedFile?.name}>
                                                <IconDownload />
                                            </a>
                                        </Button>
                                    </div>

                                    <div>
                                        <Button
                                            variant="ghost"
                                            size="small"
                                            className="w-fit"
                                        >
                                            <IconX color="red" onClick={() => setIsDeleteFileDialogOpen(true)} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex justify-center font-bold">
                                    <p>{data?.key}</p>
                                </div>
                            </div>
                        }

                        <div className="flex justify-center">
                            <Button
                                disabled={!selectedFile || !userId}
                                onClick={() => {
                                    if (!selectedFile || !userId) {
                                        return
                                    }

                                    uploadFile.mutate({
                                        file: selectedFile,
                                        applicationId: data!.id!
                                    })
                                }}
                            >
                                Upload CV
                            </Button>
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