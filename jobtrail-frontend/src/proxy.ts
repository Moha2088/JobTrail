import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { verifySession } from "@/services/session/verifySession"
import { isProduction } from "./app/api/apiClients"


export async function proxy(req: NextRequest) {
    const protectedRoutes = [
        "/applications",
        "/user"
    ]

    const baseURL = isProduction ? process.env.PROD_FRONTEND_URL : "http://localhost:3000"
    const currentPath = req.nextUrl.pathname

    console.log("---- ENVIRONMENT ----: " + process.env.NODE_ENV)

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session")?.value

    if (protectedRoutes.includes(currentPath) || protectedRoutes.some(route => currentPath.startsWith(route))) {
        if(!sessionToken) {
            console.log("Session token not found! Redirecting to login!")
            return NextResponse.redirect(`${baseURL}/login?redirect=${currentPath}`)
        }

        try {
            await verifySession(sessionToken)
            console.log("Session found!")
        }

        catch (err) {
            console.log("Session invalid!: " + (err as Error).message)
            return NextResponse.redirect(`${baseURL}/login`)
        }
    }

    if(currentPath === "/login") {
        if(sessionToken) {
            console.log("Session found, redirecting to applications!")
            return NextResponse.redirect(`${baseURL}/applications`)
        }
    }
}