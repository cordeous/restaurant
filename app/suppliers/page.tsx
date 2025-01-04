import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SuppliersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search suppliers..."
            className="w-[150px] lg:w-[250px]"
          />
          <Button>Add Supplier</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Supplier List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Items Supplied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Fresh Foods Inc.</TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell>john@freshfoods.com</TableCell>
                <TableCell>+1 234-567-8900</TableCell>
                <TableCell>Vegetables, Fruits</TableCell>
                <TableCell>
                  <Badge variant="secondary">Active</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
              {/* Add more suppliers as needed */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 