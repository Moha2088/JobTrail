import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/services/session/verifySession"


export async function GET(req: NextRequest) {
    console.log("Entered GET session")

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if(!sessionCookie) {
        return new NextResponse(null, {
            status: 401,
            statusText: "Session cookie not found"
        })
    }

    try {
        const sessionValues = await verifySession(sessionCookie.value)
        const { userId, expiresAt, name, email, accessToken } = sessionValues

        return NextResponse.json({
            userId,
            expiresAt,
            name,
            email,
            accessToken
        })
    }

    catch {
        return new NextResponse(null, {
            status: 401,
            statusText : "Session is invalid or has expired"
        })
    }
}