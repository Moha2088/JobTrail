import { Button } from "@/components/ui/controls/Button"
import { ReactNode } from "react"
import {
    DropdownMenu,  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export type ApplicationStatus = "PENDING" | "REJECTED" | "OFFER" | "ACCEPTED"

interface StatusDropdownMenuProps {
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: ReactNode
    selectStatus: (status: ApplicationStatus) => void
}


export function StatusDropdownMenu(props: StatusDropdownMenuProps) {
    const { isOpen, onOpenChange, trigger, selectStatus } = props

    return (
        <DropdownMenu
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DropdownMenuTrigger asChild>
                {trigger ?? <Button variant="light" size="small">Status</Button>}
            </DropdownMenuTrigger>

            <Content selectStatus={selectStatus} />
        </DropdownMenu>
    )
}


interface ContentProps {
    selectStatus: (status: ApplicationStatus) => void
}

function Content(props: ContentProps) {
    const { selectStatus } = props

    return (
        <DropdownMenuContent>
            <DropdownMenuGroup>
                <DropdownMenuLabel className="font-bold">
                    Status
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer" onClick={() => selectStatus("PENDING")}>
                    PENDING
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => selectStatus("REJECTED")}>
                    REJECTED
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => selectStatus("OFFER")}>
                    OFFER
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => selectStatus("ACCEPTED")}>
                    ACCEPTED
                </DropdownMenuItem>

            </DropdownMenuGroup>
        </DropdownMenuContent>
    )
}