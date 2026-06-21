import { PreviewTabType } from "@/app/page"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface PreviewTabProps {
    setPreviewTab: (tab: PreviewTabType) =>  void
}


export function PreviewTab(props: PreviewTabProps) {
    const { setPreviewTab } = props

    return (
        <Tabs defaultValue="Application Management">
            <TabsList className="">
                <TabsTrigger
                    className="cursor-pointer"
                    value="Application Management"
                    onClick={() => setPreviewTab("Application Management")}
                >
                    Application Management
                </TabsTrigger>
                
                <TabsTrigger
                    value="AI"
                    className="cursor-pointer"
                    onClick={() => setPreviewTab("AI")}
                >
                    AI
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}