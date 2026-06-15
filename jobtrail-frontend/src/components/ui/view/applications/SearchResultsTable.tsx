

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useDeleteApplication } from "@/services/applications"
import { useRouter } from "next/navigation"
import { IconArrowNarrowRight, IconTrash } from "@tabler/icons-react"


interface SearchResultsTableProps {
    applications?: unknown[]
    query: string
}

export function SearchResultsTable(props: SearchResultsTableProps) {
    const { applications } = props

    const deleteApplication = useDeleteApplication()

    const router = useRouter()

    return (
        
        <Table className="w-full max-w-5xl px-4 mr-auto ml-auto rounded-2xl" >
            <TableHeader>
                <TableRow>
                    <TableHead>Company name</TableHead>
                    <TableHead>Search Content</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications?.map(app => (
                    <TableRow key={app.Id}>
                        <TableCell className="cursor-pointer">{app.CompanyName}</TableCell>
                        <TableCell>
                            <div>
                                <div className="flex text-xs gap-1">
                                    <p>
                                        {app.Content.substring(app.Content.indexOf(props.query) - 50, app.Content.indexOf(props.query))}
                                    </p>

                                    <p className="bg-yellow-400 rounded-sm px-1">
                                        {props.query}
                                    </p>
                                </div>

                                <div className="inline-block">
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <IconArrowNarrowRight
                                className="cursor-pointer hover:text-gray-300" 
                                onClick={() => router.push(`/applications/${app.Id}`)} 
                            />
                        </TableCell>
                        <TableCell>
                            <IconTrash 
                                size={20}
                                className="cursor-pointer text-red-500 hover:text-red-200"
                                onClick={() => {
                                    deleteApplication.mutate({
                                        applicationId: app.Id
                                    })
                                }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}