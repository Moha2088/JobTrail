import { Provider } from "@/app/applications/[applicationId]/page"
import { cn } from "@/lib/utils"
import { HTMLAttributes, PropsWithChildren, useEffect, useState } from "react"


interface ToggleProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement>{
    setProvider: (provider: Provider) => void
    text: Provider
    current: Provider
}


export function Toggle(props: ToggleProps) {
    const { children, text, setProvider, current, className } = props

    const [isToggled, setIsToggled] = useState<boolean>(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsToggled(current == text)
    }, [current, text])

    return (
        <div
            className={cn(`flex justify-center cursor-pointer hover:bg-gray-100 w-fit p-2 rounded-md ${isToggled? "bg-gray-100" : ""}`, className)}
            onClick={() => {
                setIsToggled(!isToggled)
                setProvider(text)
            }}
        >
            {children}
        </div>
    )
}