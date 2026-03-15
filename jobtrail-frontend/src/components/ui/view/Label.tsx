import React from "react"

interface LabelProps {
    children?: React.ReactNode
    iconStart?: React.ReactNode
    iconEnd?: React.ReactNode
}

export function Label(props: LabelProps) {
    const { children, iconStart, iconEnd } = props

    return (
        <div className="flex gap-2 bg-blue-200 p-2 rounded-full hover:bg-orange-150">
            {iconStart}
            <p className="text-sm text-white">
                {children}
            </p>
            {iconEnd}
        </div>
    )
}