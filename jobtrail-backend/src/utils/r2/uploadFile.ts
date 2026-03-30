import { PutObjectCommand } from "@aws-sdk/client-s3"
import { r2 } from "../../clients/r2"


interface UploadParams {
    buffer: ArrayBuffer
    name: string
    applicationId: string
}

interface UploadResponse {
    key: string
}


export async function uploadToR2(params: UploadParams): Promise<UploadResponse> {
    const { buffer, name, applicationId } = params

    const fileName = name.substring(0, name.lastIndexOf('.'))
    const key = `${applicationId}-${fileName}`

    const putObjectCommand = new PutObjectCommand({
        Bucket: "resumes",
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: "application/pdf",       
    })

    await r2.send(putObjectCommand)

    return {
        key: key
    }
}