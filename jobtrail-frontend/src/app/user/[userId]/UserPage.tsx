
import { Metadata } from "next"
import UserPage from "@/app/user/[userId]/page"
import { useSession } from "@/services/session/useSession"


export default function Page() {
    const { data } = useSession()

    const metadata: Metadata = {
        title: ""
    }

    metadata.title = data?.name ?? "N/A"

    return (
        <div>
            <UserPage />
        </div>
    )
}