import { PropsWithChildren } from "react"


export function StreamedTextOutput(props: PropsWithChildren) {
    const { children } = props

    return (
        <div className=" bg-green-300 p-5 rounded-xl">
            {children}
        </div>
    )
}