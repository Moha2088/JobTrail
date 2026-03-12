import { Metadata } from "next"
import ApplicationsPage from "@/app/applications/ApplicationsPage"

export const metadata: Metadata = {
    title: "Applications"
}


export default function Page() {
    return (
        <ApplicationsPage />
    )
}