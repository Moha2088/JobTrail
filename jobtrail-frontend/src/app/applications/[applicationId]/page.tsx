"use client"

import { useApplication } from "@/services/applications/useApplication"
import { IconArrowBack } from "@tabler/icons-react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"


export default function Page() {
    const { applicationId } = useParams()

    const application = useApplication(Number(applicationId))

    const router = useRouter()

    return (
        <>
            <div className="p-3">
                <IconArrowBack
                    size={30} 
                    className="cursor-pointer text-black hover:text-gray-400" 
                    onClick={() => router.back()} 
                />
            </div>

            <div className="mb-10">
                <p className="flex justify-center text-4xl font-bold">
                    {application.data?.companyName ?? "Not Found"}
                </p>
            </div>

            <div className=" bg-gray-50 mr-auto ml-auto w-fit p-5 rounded-xl">

                <div className="flex justify-center p-3">
                    <label className="font-bold">Email:</label>
                    <p>{application.data?.email}</p>
                </div>
                
                <div className="flex justify-center p-3">
                    <label className="font-bold">Application Status:</label>
                    <p>{application.data?.applicationStatus}</p>
                </div>
                
                <div className="flex justify-center p-3">
                    <label className="font-bold">Position:</label>
                    <p>{application.data?.position}</p>
                </div>

                <div className="flex justify-center mb-10 p-3">
                    <label className="font-bold">Created At:</label>
                    <p>{application.data?.createdAt ? new Date(application.data.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>

                <div className="flex flex-col justify-center p-3 max-w-150">
                    <label className="flex justify-center mb-5 font-bold text-xl">Content:</label>
                    <div>
                        <p>{application.data?.content}</p>
                    </div>
                </div>
            </div>
        </>
    )

}