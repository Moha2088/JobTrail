import Link from "next/link"
import { Button } from "../../controls/Button"
import { IconArrowRight } from "@tabler/icons-react"
import { motion } from "motion/react"


interface JobPostingProps {
    position: string
    jobPostingLink: string
}

export function JobPosting(props: JobPostingProps) {
    const { position, jobPostingLink } = props

    return(
        <div className="mr-auto ml-auto px-5 py-7 w-full max-w-xl md:w-150 flex-col rounded-xl text-white bg-stone-800 text- mb-10 mx-4 md:mx-auto">
            <div className="flex justify-center mb-10">
                <h1 className="text-xl font-bold">
                    {position}
                </h1>
            </div>

            <div className="flex flex-row gap-3 justify-center text-sm">
                <div className="mt-2">
                    <p className="font-bold">
                        Go to
                    </p>
                </div>

                <motion.div
                    whileHover={{ x: 5 }}
                    className="bg-white p-2 rounded-full hover:bg-gray-300">
                    <Link target="_blank" rel="noopener noreferrer" href={jobPostingLink}>
                        <IconArrowRight color="black"/>    
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}