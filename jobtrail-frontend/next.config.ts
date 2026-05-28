import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.r2.cloudflarestorage.com"
            }
        ]
    }
}

export default nextConfig
