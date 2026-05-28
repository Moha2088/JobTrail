import Link from "next/link"


interface JobPostingProps {
    position: string
    jobPostingLink: string
}

export function JobPosting(props: JobPostingProps) {
    const { position, jobPostingLink } = props

    return(
        <div className="mr-auto ml-auto px-5 py-7 w-150 flex-col rounded-xl text-white bg-stone-800 text- mb-10">
            <div className="flex justify-center mb-10">
                <h1 className="text-xl font-bold">
                    {position}
                </h1>
            </div>

            <div className="flex justify-center text-sm">
                <Link target="_blank" className="max-w-100 font-bold hover:underline" href={jobPostingLink}>
                    {jobPostingLink}
                </Link>
            </div>
        </div>
    )
}