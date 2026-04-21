import { useEffect, useRef, useState } from "react"
import { Progress } from "../../progress"
import { useCancelDeletion } from "@/services/applications/useCancelDeletion"
import { IconArrowBackUp } from "@tabler/icons-react"
import { toast } from "sonner"


interface DeleteProgressBarProps {
    pendingDeletion: boolean
    id: number
}


export function DeleteProgressBar(props: DeleteProgressBarProps) {
    const isFirstRender = useRef<boolean>(false)

    const { pendingDeletion, id } = props

    const cancelDeletion = useCancelDeletion()

    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if (progress >= 100) return

        if(!isFirstRender.current) {
            toast.warning("Click the arrow to undo!", {
                position: "top-right"
            })

            isFirstRender.current = true
        }

        const timer = setTimeout(() => {
            setProgress(prev => prev + 1)
            return clearTimeout(timer)
        }, 100)
    }, [progress])

    return (
        <div>
            <div className="flex gap-5">
                <Progress className="w-20 mt-1.5" value={progress} />
                {pendingDeletion &&
                <div>
                    <IconArrowBackUp
                        size={20}
                        onClick={() => cancelDeletion.mutate({
                            applicationId: id
                        })} 
                        className="cursor-pointer"
                        color="red" 
                    />
                </div>
                }
            </div>
        </div>
    )
}