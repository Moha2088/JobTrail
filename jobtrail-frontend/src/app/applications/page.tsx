"use client"

import { Button } from "@/components/ui/controls/Button"
import { ApplicationTable } from "@/components/ui/view/ApplicationTable"
import { Application } from "@/services/applications/types"
import { useApplications } from "@/services/applications/useApplications"
import { useDeleteApplication } from "@/services/applications/useDeleteApplication"
import { useGetMe } from "@/services/auth/useGetMe"
import { useState } from "react"


export default function Page() {
    const applications = useApplications().data

    const me = useGetMe().data


    const [applicationToDelete, setApplicationToDelete] = useState<number | null>(null)

    const deleteApplication = useDeleteApplication(applicationToDelete!)


    const [mockApplications, setMockApplications] = useState<Application[]>([
        {
            id: 1,
            companyName: "Google",
            position: "Software Engineer",
            applicationStatus: "PENDING",
            email: "example@google.com"
        },
        {
            id: 2,
            companyName: "Meta",
            position: "UI/UX Designer",
            applicationStatus: "INTERVIEWING",
            email: "example@meta.com"
        },
        {
            id: 3,
            companyName: "Amazon",
            position: "Data Scientist",
            applicationStatus: "REJECTED",
            email: "example@amazon.com"
        },
        {
            id: 4,
            companyName: "Microsoft",
            position: "Product Manager",
            applicationStatus: "OFFER",
            email: "example@microsoft.com"
        }
    ])

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
        <div>
            <div className="p-10" />

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
                applications={applications ?? mockApplications} />
        </div>
    )
}