import {
    IconContract,
    IconLoaderQuarter, IconThumbDownFilled,
} from "@tabler/icons-react"


interface MetricsProps {
    pendingCount: number
    rejectedCount: number
    acceptedCount: number
}

export function Metrics(props: MetricsProps) {
    const { pendingCount, rejectedCount, acceptedCount } = props


    return (
        <div className="flex justify-center flex-row gap-3">
            <div className="border-2 p-8 w-fit rounded-xl shadow-md">
                <div className="flex flex-row">
                    <div className="flex justify-start w-40 font-bold text-sm">
                        Pending
                    </div>

                    <IconLoaderQuarter color="black" />

                </div>

                <div className="flex justify-center text-2xl mt-5">
                    {pendingCount}
                </div>

            </div>

            <div className="border-2 p-8 w-fit rounded-xl shadow-md">
                <div className="flex flex-row">
                    <div className="flex justify-start w-40 font-bold text-sm">
                        Rejected
                    </div>

                    <IconThumbDownFilled color="red" />
                </div>
                
                
                <div className="flex justify-center text-2xl mt-5">
                    {rejectedCount}
                </div>

            </div>

            <div className="border-2 p-8 w-fit rounded-xl shadow-md">
                <div className="flex flex-row">
                    <div className="flex justify-start w-40 font-bold text-sm">
                        Accepted
                    </div>

                    <IconContract className="text-green-400" />
                </div>
                
                
                <div className="flex justify-center text-2xl mt-5">
                    {acceptedCount}
                </div>
                

            </div>
        </div>
    )
}