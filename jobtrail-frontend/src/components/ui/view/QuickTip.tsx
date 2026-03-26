import { cn } from "@/lib/utils"
import { IconBulbFilled, IconTrashFilled, IconX } from "@tabler/icons-react"
import { motion } from "motion/react"
import { ComponentProps, PropsWithChildren, useState } from "react"


interface QuickTipProps extends PropsWithChildren, ComponentProps<"div"> {

}


export function QuickTip(props: QuickTipProps) {
    const { children, className, ...rest } = props

    const [hideTip, setHideTip] = useState<boolean>()

    const dismissTip = () => {
        setHideTip(true)
    }

    return (
        <>
            {!hideTip &&
                <motion.div
                    className={`absolute w-fit p-3 bg-yellow-50 max-w-120 border ml-10 rounded-xl text-sm ${cn(className)}`}
                    initial={{ opacity: 0, y: 50, x: 730 }}
                    transition={{ duration: 0.5, delay: 10 }}
                    animate={{ opacity: 1, y: 20 }}
                >
                    <div>
                        <div className="flex mb-1">
                            <div className="flex w-full mb-3">
                                <p className="font-bold text-lg">
                                    Quick Tip <IconBulbFilled className="text-yellow-400 inline-block" />
                                </p>
                            </div>

                            <div
                                className="flex justify-end">
                                <IconX onClick={dismissTip} className="text-black hover:text-gray-300 cursor-pointer" />
                            </div>
                        </div>
                        
                        <div>
                            <p>
                                {children}
                            </p>
                        </div>
                    </div>
                    
                </motion.div>
            }
        </>
    )
}