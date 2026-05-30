import { useJobPostings } from "@/services/notion/useJobPostings"
import { LoadingDots } from "../motion/LoadingDots"
import { JobPosting } from "./JobPosting"
import { Input } from "@/components/ui/controls/Input"
import { IconSearch, IconX } from "@tabler/icons-react"
import { useRef, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"

export function ExploreTab() {
    const { data, isLoading } = useJobPostings()

    const [searchString, setSearchString] = useState<string>("")

    const debouncedSearchString = useDebounce(searchString)

    const filteredJobPostings = data?.filter((p, i) => {
        if(!debouncedSearchString) {
            return
        }

        return p.properties.Position.title[0].plain_text.toLowerCase().includes(debouncedSearchString.trim().toLowerCase())
    })

    const inputRef = useRef<HTMLInputElement>(null)

    const clearInput = () => {
        setSearchString("")
        inputRef!.current!.value = ""
    }

    return (
        <div>
            <div className="flex justify-center mt-15 mb-10">
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

            <div className="flex justify-center mb-10">
                <Input
                    ref={inputRef}
                    placeholder="Enter position"
                    withDivider
                    className="w-70 text-xs"
                    variant="pill"
                    onChange={(e) => setSearchString(e.target.value)}
                    iconStart={<IconSearch className="mt-0.5" color="gray" size={20}/>}
                    iconEnd=
                        {searchString &&
                            <IconX className={" cursor-pointer hover:text-gray-200"} size={20} onClick={clearInput} />
                        }
                >
                </Input>
            </div>


            {data?.length == 0 && !isLoading &&
                <div>
                    No job postings are available at the moment. Check again later!
                </div>
            }

            {isLoading &&
                <div className="flex justify-center items-center">
                    <LoadingDots />
                </div>
            }

            {data && !debouncedSearchString &&
                data.map((p) => (
                    <JobPosting
                        key={p.id}
                        position={p.properties.Position.title[0].plain_text} 
                        jobPostingLink={p.properties.JobPostingLink.url} 
                    />
                ))
            }

            {data && debouncedSearchString && filteredJobPostings &&
                filteredJobPostings.map((p) => (
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