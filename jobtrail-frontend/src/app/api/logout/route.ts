import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import axios from "axios"
import { getSession } from "@/services/session/getSession"
import { axiosClient } from "../apiClients"


export async function POST() {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if(!sessionCookie) {
        return NextResponse.json(null)
    }

    await axiosClient.post("/auth/logout")

    cookieStore.delete("session")
    return NextResponse.json(null)
}