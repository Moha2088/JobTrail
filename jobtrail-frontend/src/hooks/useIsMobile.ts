import { useEffect, useState } from "react"

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
    
    useEffect(() => {
        const mq = window.matchMedia('(pointer: coarse)')
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobile(mq.matches)
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])
    
    return isMobile
}