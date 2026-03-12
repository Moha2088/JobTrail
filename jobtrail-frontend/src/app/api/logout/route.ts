import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import axios from "axios"
import { getSession } from "@/services/session/getSession"


export async function POST() {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if(!sessionCookie) {
        return NextResponse.json(null)
    }

    await axios.post("http://localhost:3003/api/auth/logout")

    cookieStore.delete("session")
    return NextResponse.json(null)
}