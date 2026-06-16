import { RefObject } from "react"

interface GetKeyEventsParams {
    isSlashPressed: RefObject<boolean>
    isShiftPressed: RefObject<boolean>
    searchInputRef: RefObject<HTMLInputElement | null>
}

export function getKeyEvents(params: GetKeyEventsParams) {
    const { isShiftPressed, isSlashPressed, searchInputRef } = params

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

    return { handleKeyDown, handleKeyUp }
}