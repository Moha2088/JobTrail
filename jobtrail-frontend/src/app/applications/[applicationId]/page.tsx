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

            <div className="p-5" />

            <div>
                <p className="flex justify-center text-4xl font-bold ml-10">
                    {application.data?.companyName ?? "Not Found"}
                </p>
            </div>

            <div className="p-20" />

            <div className="bg-gray-200 mr-auto ml-auto w-fit p-5 rounded-xl">

                <div className="p-3">
                    <label className="font-bold">Email:</label>
                    <p>{application.data?.email}</p>
                </div>
                
                <div className="p-3">
                    <label className="font-bold">Application Status:</label>
                    <p>{application.data?.applicationStatus}</p>
                </div>
                
                <div className="p-3">
                    <label className="font-bold">Position:</label>
                    <p>{application.data?.position}</p>
                </div>

                <div>
                    <label className="font-bold">Created At:</label>
                    <p>{application.data?.createdAt ? new Date(application.data.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
            </div>
        </>
    )

}