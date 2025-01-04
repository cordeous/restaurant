import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AlertsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Alerts</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge variant="destructive">Low Stock</Badge>
                </TableCell>
                <TableCell>Stock below reorder point</TableCell>
                <TableCell>Chicken Breast</TableCell>
                <TableCell>2 hours ago</TableCell>
                <TableCell>
                  <Badge variant="outline">Pending</Badge>
                </TableCell>
              </TableRow>
              {/* Add more alerts as needed */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 