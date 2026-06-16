import { S3Client } from "@aws-sdk/client-s3"
import { S3Client as BunS3Client } from "bun"

export const r2 = new S3Client({
    region: "auto",
    endpoint: Bun.env.R2_ENDPOINT!,
    credentials: {
        secretAccessKey: Bun.env.R2_SECRET_ACCESS_KEY!,
        accessKeyId: Bun.env.R2_ACCESS_KEY_ID!,
    }
})

// Experimental Bun native S3 client
export const bunClient = new BunS3Client({
    region: "auto",
    endpoint: Bun.env.R2_ENDPOINT!,
    secretAccessKey: Bun.env.R2_SECRET_ACCESS_KEY!,
    accessKeyId: Bun.env.R2_ACCESS_KEY_ID!,
})