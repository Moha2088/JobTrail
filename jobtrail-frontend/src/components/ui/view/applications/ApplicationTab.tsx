import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { IconArticle, IconFlameFilled } from "@tabler/icons-react"
import { ComponentProps } from "react"

export type Tab = "applications" | "explore"


interface ApplicationTabProps {
    setActiveTab: (tab: Tab) => void
}

export function ApplicationTab(props: ApplicationTabProps) {
    const { setActiveTab } = props

    
    return (
        <Tabs className="absolute mt-10" defaultValue="applications">
            <TabsList variant="line">
                <TabsTrigger className="hover:cursor-pointer" onClick={() => setActiveTab("applications")} value="applications">Applications <IconArticle /></TabsTrigger>
                <TabsTrigger className="hover:cursor-pointer" onClick={() => setActiveTab("explore")} value="explore">Explore <IconFlameFilled color="red" /> </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
