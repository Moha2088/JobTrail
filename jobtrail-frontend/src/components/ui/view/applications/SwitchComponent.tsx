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

                <div>
                    <p className="text-gray-400">
                        <p className="text-xs">
                            {text}
                        </p>
                    </p>
                </div>
            </div>

            <div>
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