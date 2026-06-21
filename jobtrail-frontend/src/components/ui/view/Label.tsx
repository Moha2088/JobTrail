import React from "react"

interface LabelProps {
    children?: React.ReactNode
    iconStart?: React.ReactNode
    iconEnd?: React.ReactNode
}

export function Label(props: LabelProps) {
    const { children, iconStart, iconEnd } = props

    return (
        <div className="flex gap-2 border-2 border-gray-100 p-2 rounded-sm">
            {iconStart}
            <p className="text-sm text-black">
                {children}
            </p>
            {iconEnd}
        </div>
    )
}