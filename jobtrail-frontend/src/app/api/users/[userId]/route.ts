import { getSession } from "@/services/session/getSession"
import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { axiosClient } from "../../apiClients"

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ userId: number }> }) {
    const { userId } = await params


    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if(!sessionCookie) {
        return new Response("Unauthorized", { status: 401 })
    }

    const session = await getSession()

    await axiosClient.delete(`/api/users/${userId}`, {
        headers: {
            Authorization: "Bearer " + session?.accessToken
        }
    })

    cookieStore.delete("session")
    
    return NextResponse.json({ message: "User deleted" })
}