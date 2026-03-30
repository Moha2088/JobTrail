import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { r2 } from "../../clients/r2"
import { fileExists } from "./fileExists"

interface GetFileParams {
    key: string
}

export async function getFile(params: GetFileParams) {
    const { key } = params

    if(!key) {
        throw new Error("Key is required")
    }

    try {
        const getObjectCommand = new GetObjectCommand({
            Bucket: "resumes",
            Key: key
        })

        const signedUrl = await getSignedUrl(r2, getObjectCommand, {
            expiresIn: 3600
        })

        return signedUrl
    }

    catch(error) {
        throw new Error("Error getting file: " +  (error as Error).message)
    }
}