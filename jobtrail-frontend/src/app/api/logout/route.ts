import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function POST() {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")


    if(!sessionCookie) {
        return NextResponse.json(null)
    }

    cookieStore.delete("session")
    return NextResponse.json(null)
}