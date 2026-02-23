"use client"

import { Button } from "@/components/ui/controls/Button"
import { ApplicationTable } from "@/components/ui/view/ApplicationTable"
import { Application } from "@/services/applications/types"
import { useApplications } from "@/services/applications/useApplications"
import { useState } from "react"


export default function Page() {
    const applications = useApplications()

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

    const deleteApplication = (id: number) => {
        setMockApplications(mockApplications.filter(app => app.id != id))
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

            <ApplicationTable
                deleteApplication={deleteApplication}
                applications={mockApplications} />
        </div>
    )
}