"use client"

import { useApplication } from "@/services/applications/useApplication"
import { useParams, useSearchParams } from "next/navigation"


export default function Page() {
    const { applicationId } = useParams()

    const application = useApplication(Number(applicationId))

    return (
        <div>

        </div>
    )

}