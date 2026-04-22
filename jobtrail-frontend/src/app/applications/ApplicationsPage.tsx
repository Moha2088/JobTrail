"use client"

import { CreateApplicationDialog } from "@/components/ui/controls/application/CreateApplicationDialog"
import { Button } from "@/components/ui/controls/Button"
import { ApplicationTable } from "@/components/ui/view/applications/ApplicationTable"
import { Metrics } from "@/components/ui/view/applications/Metrics"
import { useApplications } from "@/services/applications"
import { useLogOut } from "@/services/auth/useLogOut"
import {
    IconFileDescription,
    IconLogout,
    IconPlus,
    IconSearch,
    IconUser
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useSessionContext } from "@/contexts/session/SessionContext"
import Link from "next/link"
import { useDebounce } from "@/hooks/useDebounce"
import { Input } from "@/components/ui/controls/Input"
import { LoadingDots } from "@/components/ui/view/motion/LoadingDots"
import { useSearchContent } from "@/services/applications/useSearchContent"
import { SearchResultsTable } from "@/components/ui/view/applications/SearchResultsTable"


export default function ApplicationsPage() {
    const [isCreateApplicationDialogOpen, setIsCreateApplicationDialogOpen] = useState<boolean>(false)
    
    const [searchQuery, setSearchQuery] = useState<string>("")
    const isShiftPressed = useRef<boolean>(false)
    const isSlashPressed = useRef<boolean>(false)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const [isFullTextSearchEnabled, setIsFullTextSearchEnabled] = useState<boolean>(false)

    const debouncedSearchQuery = useDebounce(searchQuery)

    const { data, isLoading } = useApplications()

    const { data: searchData, isLoading: isSearchLoading } = useSearchContent(debouncedSearchQuery)

    const router = useRouter()
    const session = useSessionContext()

    const logOut = useLogOut()

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
        document.addEventListener("keydown", (event) => {
            handleKeyDown(event)
        })

        document.addEventListener("keyup", (e) => {
            handleKeyUp(e)
        })

        return () => {
            document.removeEventListener("keydown", () => { })
            document.removeEventListener("keyup", () => { })
        }
    }, [])

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

    return (
        <div className="h-screen">
            <div className="p-5" />
            <div className="flex flex-row">

                <div className="flex justify-start items-center w-screen gap-25">
                    <p className=" text-2xl text-blue-400 tracking-tighter font-bold ml-20">
                        Welcome back, {session?.name}!
                    </p>

                    <div className="flex flex-col">
                        <div className="flex flex-col gap-3">
                            <Input
                                ref={searchInputRef}
                                variant="pill"
                                placeholder={isFullTextSearchEnabled ? "Search by content..." : "Search by company name..."}
                                withDivider
                                className="text-xs"
                                iconStart={<IconSearch className=" ml-2" color="gray" size={20} />}
                                iconEnd={<IconFileDescription onClick={() => setIsFullTextSearchEnabled(!isFullTextSearchEnabled)} className={`cursor-pointer ${isFullTextSearchEnabled ? "text-black hover:text-gray-400" : "text-gray-400 hover:text-black"}`} />}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    
                </div>

                <div className="flex mr-10 gap-3">
                    <div className="pt-2 p-2 mr-3 border-gray-100 border-2 rounded-full hover:bg-gray-200">
                        <Link href={`/user/${session?.userId}`}>
                            <IconUser size={28} />
                        </Link>
                    </div>

                    <div>
                        <Button
                            className="w-fit"
                            size="small"
                            onClick={() => setIsCreateApplicationDialogOpen(true)}
                            iconEnd={<IconPlus />}
                        >
                            Create
                        </Button>
                    </div>

                    <div>
                        <Button
                            size="small"
                            onClick={async() => logOut.mutate(undefined, {
                                onSuccess: () => {
                                    console.log("Logging out!")
                                    router.replace("/")
                                }
                            })}
                            variant="destructive"
                            iconEnd={<IconLogout />}
                            className=""
                        >
                            Log Out
                        </Button>
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

            <div className="p-10" />

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

        </div>
    )
}