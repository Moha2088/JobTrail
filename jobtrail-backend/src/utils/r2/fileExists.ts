import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "../../clients/r2"


export async function fileExists(key: string) {
    const headObjectCommand = new HeadObjectCommand({
        Bucket: "resumes",
        Key: key
    })

    try {
        await r2.send(headObjectCommand)
        return true
    }

    catch (err) {
        if((err as Error).name == "NotFound") {
            return false
        }
    }
}