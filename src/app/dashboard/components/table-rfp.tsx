import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MagicWandIcon } from "@radix-ui/react-icons"

type TableRowData = {
    id: string;
    priority: 'High' | 'Medium' | 'Low';
    title: string;
};


export function Table_RFPs() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">RFP</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Summary</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {mockData.map((data) => (
                    <TableRow key={data.id}>
                        <TableCell className="font-medium">{data.id}</TableCell>
                        <TableCell>{data.priority}</TableCell>
                        <TableCell>{data.title}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="link" size="icon"><MagicWandIcon /></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const mockData: TableRowData[] = [
    { id: 'RFP001', priority: 'High', title: 'I need 10 high performance computers.' },
    { id: 'RFP002', priority: 'Medium', title: 'I need 20 medium performance computers.' },
    { id: 'RFP003', priority: 'Low', title: 'I need 30 low performance computers.' },
    { id: 'RFP004', priority: 'High', title: 'I need 40 high performance computers.' },
    { id: 'RFP005', priority: 'Medium', title: 'I need 50 medium performance computers.' },
    { id: 'RFP006', priority: 'Low', title: 'I need 60 low performance computers.' },
    { id: 'RFP007', priority: 'High', title: 'I need 70 high performance computers.' },
    { id: 'RFP008', priority: 'Medium', title: 'I need 80 medium performance computers.' },
    { id: 'RFP009', priority: 'Low', title: 'I need 90 low performance computers.' },
    { id: 'RFP010', priority: 'High', title: 'I need 100 high performance computers.' },
];