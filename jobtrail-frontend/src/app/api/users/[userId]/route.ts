import { getSession } from "@/services/session/getSession"
import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { axiosClient } from "../../apiClients"
import { PutUser } from "@/services/users/types"
import { SessionData } from "../../login/types"
import { signSession } from "@/services/session/signSession"

interface PutUserResponse {
    name: string
    email: string
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{userId: number}> }) {
    const { userId } = await params
    const body = await req.json() as PutUser
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if(!sessionCookie) {
        return new Response("Unauthorized", { status: 401 })
    }

    const session = await getSession()

    const { data } = await axiosClient.put(`/api/users/${userId}`, body, {
        headers: {
            Authorization: "Bearer " + session?.accessToken
        }
    })

    const { name, email } = data as PutUserResponse

    const updatedSessionData: SessionData = {
        ...session!,
        name, 
        email
    }

    const updatedSessionToken = await signSession(updatedSessionData)

    cookieStore.set({
        name: "session",
        httpOnly: true,
        value: updatedSessionToken,
        // expires: new Date(updatedSessionData.expiresAt * 1000)
    })

    return new Response(null, { status: 200 })
}

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