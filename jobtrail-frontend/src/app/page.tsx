"use client"

import { Button } from "@/components/ui/controls/Button";
import { usePostApplication } from "@/services/applications/usePostApplication";
import Image from "next/image";

export default function Home() {

    const postApplication = usePostApplication()
  
    return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Button onClick={() => postApplication.mutate({
            companyName: "Bun",
            email: "bun@bun.com",
            applicationStatus: "PENDING",
            position: "Developer Experience Engineer"
        })}>
    Click
        </Button>
    </div>
  );
}
