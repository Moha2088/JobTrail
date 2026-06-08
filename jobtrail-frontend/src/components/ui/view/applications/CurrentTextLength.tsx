interface TextLengthProps {
    currentLength: number
}

export function CurrentTextLength(props: TextLengthProps) {
    const { currentLength } = props
    const minLimit: number = 500

    const hasReachedLimit = currentLength >= minLimit

    return (
        <div className={`flex gap-0.5 ${hasReachedLimit ? "text-green-400" : "text-red-400"}`}>
            <div className="mt-0.5">
                <p className="text-xs">
                    {currentLength}
                </p>
            </div>

            <div>
                <p className="text-[15px]">
                    /
                </p>
            </div>

            <div className="mt-0.5">
                <p className="text-xs">
                    {minLimit}
                </p>
            </div>
        </div>
    )
}