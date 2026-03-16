import {
    IconContract,
    IconLoaderQuarter, IconThumbDownFilled,
} from "@tabler/icons-react"
import { motion } from "motion/react"

interface MetricsProps {
    pendingCount: number
    rejectedCount: number
    acceptedCount: number
}

export function Metrics(props: MetricsProps) {
    const { pendingCount, rejectedCount, acceptedCount } = props


    return (
        <div className="flex justify-center flex-row gap-3">
            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-2 p-8 w-fit rounded-xl shadow-md">
                <div className="flex flex-row">
                    <div className="flex justify-start w-40 font-bold text-sm">
                        Pending
                    </div>

                    <IconLoaderQuarter color="black" />

                </div>

                <div className="flex justify-center text-2xl mt-5">
                    {pendingCount}
                </div>

            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-2 p-8 w-fit rounded-xl shadow-md">
                <div className="flex flex-row">
                    <div className="flex justify-start w-40 font-bold text-sm">
                        Rejected
                    </div>

                    <IconThumbDownFilled color="red" />
                </div>
                
                
                <div className="flex justify-center text-2xl mt-5">
                    {rejectedCount}
                </div>

            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="border-2 p-8 w-fit rounded-xl shadow-md">
                <div className="flex flex-row">
                    <div className="flex justify-start w-40 font-bold text-sm">
                        Accepted
                    </div>

                    <IconContract className="text-green-400" />
                </div>
                
                
                <div className="flex justify-center text-2xl mt-5">
                    {acceptedCount}
                </div>
                

            </motion.div>
        </div>
    )
}