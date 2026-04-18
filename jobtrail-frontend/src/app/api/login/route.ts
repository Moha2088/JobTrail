import { cookies } from "next/headers"
import { SessionData } from "./types"
import { NextRequest } from "next/server"
import axios from "axios"
import { decodeJwt } from "jose"
import { signSession } from "@/services/session/signSession"
import { axiosClient } from "../apiClients"

export interface LoginData {
    accessToken: string
}


export async function POST(req: NextRequest) {
    const body = await req.json()

    const { data } = await axiosClient.post<LoginData>("/auth/login", body)
    const { accessToken } = data
    const { sub, exp, name, email } = decodeJwt(accessToken)

    const sessionData: SessionData = {
        userId: Number(sub!),
        expiresAt: exp!,
        name: name as string,
        email: email as string,
        accessToken
    }

    const sessionToken = await signSession(sessionData)
    const cookieStore = await cookies()

    cookieStore.set({
        name: "session",
        httpOnly: true,
        value: sessionToken,
        expires: new Date(exp! * 1000)
    })

    return new Response(null, { 
        status: 200 
    })
}