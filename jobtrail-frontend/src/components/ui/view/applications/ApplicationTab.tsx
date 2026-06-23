import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/useIsMobile"
import { cn } from "@/lib/utils"
import { IconArticle, IconFlameFilled } from "@tabler/icons-react"
import { ComponentProps } from "react"

export type Tab = "applications" | "explore"


interface ApplicationTabProps {
    setActiveTab: (tab: Tab) => void
}

export function ApplicationTab(props: ApplicationTabProps) {
    const { setActiveTab } = props

    const isMobile = useIsMobile()
    
    return (
        <Tabs className="relative md:absolute mt-5 md:mt-10" defaultValue="applications">
            <TabsList variant="line">
                <TabsTrigger className="hover:cursor-pointer" onClick={() => setActiveTab("applications")} value="applications">{isMobile ? "": "Applications"} <IconArticle /></TabsTrigger>
                <TabsTrigger className="hover:cursor-pointer" onClick={() => setActiveTab("explore")} value="explore">{isMobile ? "" : "Explore"} <IconFlameFilled color="red" /> </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
