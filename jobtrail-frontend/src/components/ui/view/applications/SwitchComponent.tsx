import { useState } from "react"
import { Switch } from "../../switch"

interface SwitchProps {
    header: string
    text: string
    setIgnoreContent: (val: boolean) => void
}

export function SwitchComponent(props: SwitchProps) {
    const { header, text, setIgnoreContent } = props
    const [isChecked, setIsChecked] = useState<boolean>(false)

    return (
        <div className="flex">
            <div className="flex flex-col gap-1">
                <div>
                    <p className="text-sm">
                        {header}
                    </p>
                </div>

                <div className="max-w-40">
                    <p className="text-gray-400 text-xs">
                        {text}
                    </p>
                </div>
            </div>

            <div className="ml-10">
                <Switch 
                    checked={isChecked}
                    onClick={() => {
                        setIsChecked(!isChecked)
                        setIgnoreContent(!isChecked)
                    }} 
                />
            </div>
        </div>
    )
}