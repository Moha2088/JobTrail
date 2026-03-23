import { IconBulbFilled, IconX } from "@tabler/icons-react"
import { motion } from "motion/react"
import { PropsWithChildren, useState } from "react"

interface QuickTipProps extends PropsWithChildren { 

}


export function QuickTip(props: QuickTipProps) {
    const { children } = props

    const [hideTip, setHideTip] = useState<boolean>()

    const dismissTip = () => {
        setHideTip(true)
    }

    return (
        <>
            {!hideTip &&
                <motion.div
                    className=" absolute w-fit p-3 max-w-100 bg-gray-50 ml-10 rounded-xl text-sm"
                    initial={{ opacity: 0, y: 50, x: 800 }}
                    transition={{ duration: 0.5, delay: 5 }}
                    animate={{ opacity: 1, y: 20 }}
                >
                    <div>
                        <div className="flex mb-2">
                            <div className="flex w-full">
                                <p className="font-bold">
                                    Quick Tip
                                </p>
                            </div>

                            <div className="w-full">
                                <IconBulbFilled className="text-yellow-400 size-5" />
                            </div>
                            
                            <div
                                className="flex justify-end w-screen">
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