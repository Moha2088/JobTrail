
interface LabelProps {
    children?: React.ReactNode
    icon: React.ReactNode
}

export function Label(props: LabelProps) {
    const { children, icon } = props

    return (
        <div className="flex gap-2 bg-orange-200 p-3 rounded-full hover:bg-orange-150">
            <p className="text-sm text-white">
                {children}
            </p>
            {icon}
        </div>
    )
}