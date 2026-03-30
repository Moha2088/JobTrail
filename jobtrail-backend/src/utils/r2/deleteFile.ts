import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { r2 } from "../../clients/r2"


export async function deleteFile(key: string) {
    if(!key) {
        throw new Error("Key is required")
    }

    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: "resumes",
        Key: key
    })

    await r2.send(deleteObjectCommand)
}