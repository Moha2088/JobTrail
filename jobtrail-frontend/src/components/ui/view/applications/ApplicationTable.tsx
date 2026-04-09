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
import { IconArrowBackUp, IconArrowNarrowRight, IconTrash } from "@tabler/icons-react"
import { useCancelDeletion } from "@/services/applications/useCancelDeletion"


interface ApplicationTableProps {
    applications?: Application[]
}

export function ApplicationTable(props: ApplicationTableProps) {
    const { applications } = props

    const deleteApplication = useDeleteApplication()
    const cancelApplicationDeletion = useCancelDeletion()
    

    const router = useRouter()

    return (

        <Table className="w-170 mr-auto ml-auto rounded-2xl" >
            <TableCaption>{applications && applications.length != 0
                ? `You have ${applications.length} applications`
                : "You have no applications. Click the button to create one"
            }

            </TableCaption>
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
                        <TableCell>
                            {app.pendingDeletion &&
                                <IconArrowBackUp
                                    size={20}
                                    onClick={() => cancelApplicationDeletion.mutate({
                                        applicationId: app.id
                                    })} 
                                    className="cursor-pointer"
                                    color="red" 
                                />
                            }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}