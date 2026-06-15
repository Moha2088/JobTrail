"use client"

import { CreateApplicationDialog } from "@/components/ui/controls/application/CreateApplicationDialog"
import { Button } from "@/components/ui/controls/Button"
import { ApplicationTable } from "@/components/ui/view/applications/ApplicationTable"
import { Metrics } from "@/components/ui/view/applications/Metrics"
import { useApplications } from "@/services/applications"
import { useLogOut } from "@/services/auth/useLogOut"
import {
    IconArrowBigUp,
    IconArrowBigUpFilled,
    IconArrowLeft,
    IconArrowRight,
    IconFileDescription,
    IconPlus,
    IconSearch,
    IconSlash,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useSessionContext } from "@/contexts/session/SessionContext"
import { useDebounce } from "@/hooks/useDebounce"
import { Input } from "@/components/ui/controls/Input"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"
import { useSearchContent } from "@/services/applications/useSearchContent"
import { SearchResultsTable } from "@/components/ui/view/applications/SearchResultsTable"
import { useUser } from "@/services/users/useUser"
import { ReactivateUserDialog } from "@/components/ui/controls/ReactivateUserDialog"
import { ApplicationTab, Tab } from "@/components/ui/view/applications/ApplicationTab"
import { ExploreTab } from "@/components/ui/view/applications/ExploreTab"
import { useIsMobile } from "@/hooks/useIsMobile"


export default function ApplicationsPage() {
    const [isCreateApplicationDialogOpen, setIsCreateApplicationDialogOpen] = useState<boolean>(false)

    const [searchQuery, setSearchQuery] = useState<string>("")
    const isShiftPressed = useRef<boolean>(false)
    const isSlashPressed = useRef<boolean>(false)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const [isFullTextSearchEnabled, setIsFullTextSearchEnabled] = useState<boolean>(false)
    const [tab, setTab] = useState<Tab>("applications")

    const debouncedSearchQuery = useDebounce(searchQuery)
    const isMobile = useIsMobile()

    const [page, setPage] = useState<number>(1)

    const { data, isLoading } = useApplications({ page })

    const session = useSessionContext()
    const { data: userData } = useUser(session?.userId)

    const { data: searchData, isLoading: isSearchLoading } = useSearchContent(debouncedSearchQuery)

    const handleKeyDown = (event: KeyboardEvent) => {
        if(event.key === "Shift") {
            isShiftPressed.current = true
        }
        
        if(event.key === "/") {
            isSlashPressed.current = true
        }

        if(isShiftPressed.current && isSlashPressed.current) {
            searchInputRef.current?.focus()
        }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        if(event.key === "Shift") {
            isShiftPressed.current = false
        }

        if(event.key === "/") {
            isSlashPressed.current = false
        }
    }

    useEffect(() => {
        if(isCreateApplicationDialogOpen) {
            return
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [isCreateApplicationDialogOpen])

    if(isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingDots />
            </div>
        )
    }

    if(!data) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">No applications found.</p>
            </div>
        )
    }

    const filteredApplications = data.applications.filter(app => app.companyName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))

    const pendingCount = data.metrics.pendingCount ?? 0
    const rejectedCount = data.metrics.rejectedCount ?? 0
    const acceptedCount = data.metrics.acceptedCount ?? 0

    const handleTabChange = (tab: Tab) => setTab(tab)

    return (

        <div>
            <div className="flex justify-center items-center">
                <ApplicationTab
                    setActiveTab={handleTabChange} />
            </div>

            {
                tab == "applications" ?
                    <div className="min-h-screen mb-10">
                        <div className="p-5" />
                        <div className="flex flex-row">

                            {userData?.pendingDeletion &&
                                <ReactivateUserDialog open={true}/>
                            }

                            <div className="flex flex-col md:flex-row justify-start items-center w-full gap-5 md:gap-25">
                                <p className=" text-2xl text-blue-400 tracking-tighter font-bold ml-0 md:ml-20 text-center md:text-left">
                                    Welcome back, {session?.name}!
                                </p>

                                <div className="flex flex-col z-10 mt-5">
                                    <div className="flex flex-col gap-3">
                                        <Input
                                            ref={searchInputRef}
                                            variant="pill"
                                            placeholder={isFullTextSearchEnabled ? "Search by content..." : "Search by company name..."}
                                            withDivider
                                            className="text-xs"
                                            iconStart={<IconSearch className=" ml-2" color="gray" size={20} />}
                                            iconEnd=
                                                {<div className="flex gap-3">
                                                    {!isMobile &&
                                                        <div className="flex rounded-sm gap bg-gray-200 p-1">
                                                            <IconArrowBigUp color="gray" size={13}/>
                                                            <IconPlus color="gray" size={13}/>
                                                            <IconSlash color="gray" size={13}/>
                                                        </div>
                                                    }

                                                    <div>
                                                        <IconFileDescription
                                                            size={15} 
                                                            onClick={() => setIsFullTextSearchEnabled(!isFullTextSearchEnabled)} 
                                                            className={`cursor-pointer mt-1 ${isFullTextSearchEnabled ? "text-black hover:text-gray-400" : "text-gray-400 hover:text-black"}`} 
                                                        />
                                                    </div>
                                                </div>
                                                }
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <CreateApplicationDialog
                            open={isCreateApplicationDialogOpen}
                            onOpenChange={setIsCreateApplicationDialogOpen}
                        />

                        <div className="p-5" />

                        <Metrics
                            pendingCount={pendingCount ?? 0}
                            rejectedCount={rejectedCount ?? 0}
                            acceptedCount={acceptedCount ?? 0}
                        />

                        <div className="flex justify-center mt-10 mb-10">
                            <Button
                                className="w-fit text-blue-400 hover:bg-blue-50"
                                variant="ghost"
                                size="small"
                                onClick={() => setIsCreateApplicationDialogOpen(true)}
                                iconEnd={<IconPlus className="text-blue-400" />}
                            >
                                <p className="pt-0.5">Create</p>
                            </Button>
                        </div>

                        {!isFullTextSearchEnabled &&
                            <ApplicationTable
                                applications={debouncedSearchQuery && !isFullTextSearchEnabled ? filteredApplications : data.applications}
                            />
                        }

                        {isFullTextSearchEnabled && isSearchLoading &&
                            <div className="flex justify-center">
                                <LoadingDots />
                            </div>
                        }

                        {isFullTextSearchEnabled && searchData &&
                            <SearchResultsTable applications={searchData} query={debouncedSearchQuery} />
                        }

                        <div className="flex justify-center gap-3 mt-5">
                            <div>
                                <Button
                                    variant="light"
                                    size="small"
                                    className="w-fit"
                                    disabled={page == 1}
                                    onClick={() =>  setPage(prevPage => prevPage - 1)}
                                >
                                    <IconArrowLeft size={20} />
                                </Button>
                            </div>

                            <div>
                                <div>
                                    <Button
                                        variant="light"
                                        size="small"
                                        className="w-fit"
                                        disabled={!data.hasNext}
                                        onClick={() => setPage(prevPage => prevPage + 1)}
                                    >
                                        <IconArrowRight size={20}/>
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>

                    : <ExploreTab />
            }
        </div>
    )
}