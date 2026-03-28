import { PutObjectCommand } from "@aws-sdk/client-s3"
import { r2 } from "../../clients/r2"


interface UploadParams {
    buffer: ArrayBuffer
    name: string
    userId: string
}

interface UploadResponse {
    key: string
}


export async function uploadToR2(params: UploadParams): Promise<UploadResponse> {
    const { buffer, name, userId } = params

    const fileName = name.substring(0, name.lastIndexOf('.'))
    const key = `${userId}-${fileName}`

    console.log(key)

    const putObjectCommand = new PutObjectCommand({
        Bucket: "resumes",
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: "application/pdf",       
    })

    console.log(putObjectCommand)

    await r2.send(putObjectCommand)

    return {
        key: key
    }
}