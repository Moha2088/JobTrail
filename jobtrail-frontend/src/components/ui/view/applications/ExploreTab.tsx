import { useJobPostings } from "@/services/notion/useJobPostings"
import { LoadingDots } from "../motion/LoadingDots"
import { JobPosting } from "./JobPosting"

export function ExploreTab() {
    const { data, isLoading } = useJobPostings()

    return (
        <div>
            <div className="flex justify-center mt-10 mb-10">
                <h1 className="font-bold text-3xl text-blue-400 tracking-tighter">
                    Explore View
                </h1>
            </div>

            <div className="flex justify-center mb-5">
                <p className="text-sm">
                    Having trouble finding jobs to apply for!
                </p>
            </div>

            <div className="flex justify-center mb-10">
                <p className="text-sm">
                    Check out this page for recommended job postings!
                </p>
            </div>

            <div className="flex justify-center mb-10">
                <p className="font-bold">
                    The job postings are targeted towards developers!
                </p>
            </div>

            {!data && !isLoading &&
                <div>
                    No job postings are available at the moment. Check again later!
                </div>
            }

            {isLoading &&
                <div className="flex justify-center items-center">
                    <LoadingDots />
                </div>
            }

            {data &&
                data.map((p) => (
                    <JobPosting
                        key={p.id}
                        position={p.properties.Position.title[0].plain_text} 
                        jobPostingLink={p.properties.JobPostingLink.url} 
                    />
                ))
            }
            
        </div>
    )
}