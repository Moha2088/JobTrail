import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Application, useDeleteApplication } from "@/services/applications"
import { useRouter } from "next/navigation"
import { IconArrowNarrowRight, IconTrash } from "@tabler/icons-react"


interface ApplicationTableProps {
    applications?: Application[]
}

export function ApplicationTable(props: ApplicationTableProps) {
    const { applications } = props

    const deleteApplication = useDeleteApplication()
    const router = useRouter()

    return (

        <Table className="w-full max-w-5xl px-4 mr-auto ml-auto rounded-2xl" >
            <TableHeader>
                <TableRow>
                    <TableHead>Company name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications?.map(app => (
                    <TableRow key={app?.id}>
                        <TableCell className="cursor-pointer">{app.companyName}</TableCell>
                        <TableCell>{app.position}</TableCell>
                        <TableCell>{app.applicationStatus}</TableCell>
                        <TableCell>
                            <IconArrowNarrowRight
                                className="cursor-pointer hover:text-gray-300" 
                                onClick={() => router.push(`/applications/${app.id}`)} 
                            />
                        </TableCell>
                        <TableCell>
                            <IconTrash 
                                size={20}
                                className="cursor-pointer text-red-500 hover:text-red-200"
                                onClick={() => {
                                    deleteApplication.mutate({
                                        applicationId: app.id
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