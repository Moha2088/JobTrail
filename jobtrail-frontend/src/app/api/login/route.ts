import { cookies } from "next/headers"
import { SessionData } from "./types"
import { NextRequest } from "next/server"
import axios from "axios"
import { decodeJwt } from "jose"
import { signSession } from "@/services/session/signSession"

interface LoginData {
    accessToken: string
}


export async function POST(req: NextRequest) {
    const body = await req.json()

    const { data } = await axios.post<LoginData>("http://localhost:3003/api/auth/login", body)
    const { accessToken } = data
    const { sub, exp } = decodeJwt(accessToken)

    const sessionData: SessionData = {
        userId: sub!,
        expiresAt: exp!,
    }

    const sessionToken = await signSession(sessionData)

    const cookieStore = await cookies()

    cookieStore.set({
        name: "session",
        httpOnly: true,
        value: sessionToken,
        expires: new Date(exp! * 1000)
    })

    return new Response(null, { status: 200 })
}