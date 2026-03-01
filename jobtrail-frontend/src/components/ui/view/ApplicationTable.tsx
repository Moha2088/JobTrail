import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Application } from "@/services/applications/types"
import { Button } from "../controls/Button"
import { useRouter } from "next/navigation"
import { IconArrowNarrowRight, IconTrash } from "@tabler/icons-react"


interface ApplicationTableProps {
    applications?: Application[]
    deleteApplication: (id: number) => void
}

export function ApplicationTable(props: ApplicationTableProps) {
    const { applications, deleteApplication  } = props

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
                                onClick={() => deleteApplication(app.id)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}