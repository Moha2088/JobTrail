import { RefObject } from "react"
import { Switch } from "../../switch"

interface SwitchProps {
    header: string
    text: string
    contentTextAreaRef: RefObject<HTMLTextAreaElement | null>
    setIgnoreContent: (val: boolean) => void
}

export function SwitchComponent(props: SwitchProps) {
    const { header, text, setIgnoreContent, contentTextAreaRef } = props

    return (
        <div className="flex">
            <div className="flex flex-col gap-1">
                <div>
                    <p className="text-sm">
                        {header}
                    </p>
                </div>

                <div className="max-w-40 md:max-w-60">
                    <p className="text-gray-400 text-xs">
                        {text}
                    </p>
                </div>
            </div>

            <div className="ml-10">
                <Switch className="cursor-pointer" onCheckedChange={(e) => {
                    if(e && contentTextAreaRef.current) {
                        contentTextAreaRef.current.value = ""
                    }
                    setIgnoreContent(e)
                }} />
            </div>
        </div>
    )
}