import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { verifySession } from "@/services/session/verifySession"


export async function proxy(req: NextRequest) {
    const protectedRoutes = ["/applications"]
    const currentPath = req.nextUrl.pathname

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session")?.value

    if (protectedRoutes.includes(currentPath)) {
        if(!sessionToken) {
            console.log("Session token not found! Redirecting to login!")
            return NextResponse.redirect("http://localhost:3000/login")
        }

        try {
            await verifySession(sessionToken)
            console.log("Session found!")
        }

        catch (err) {
            console.log("Session invalid!: " + (err as Error).message)
            return NextResponse.redirect(`http://localhost:3000/login`)
        }
    }

    if(currentPath === "/login") {
        if(sessionToken) {
            console.log("Session found, redirecting to applications!")
            return NextResponse.redirect("http://localhost:3000/applications")
        }
    }
}