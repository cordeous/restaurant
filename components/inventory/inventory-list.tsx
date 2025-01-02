"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InventoryItem } from "@/types"

// Sample data - replace with your actual data source
const inventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Fresh Salmon",
    category: "Seafood",
    quantity: 50,
    unit: "lbs",
    costPerUnit: 12.50,
    minimumStock: 20,
    supplier: "Ocean Fresh Seafood",
    lastRestocked: "2024-03-15",
    expiryDate: "2024-03-25"
  },
  {
    id: "2",
    name: "Basmati Rice",
    category: "Grains",
    quantity: 100,
    unit: "kg",
    costPerUnit: 3.25,
    minimumStock: 25,
    supplier: "Global Foods Inc",
    lastRestocked: "2024-03-10"
  },
  // Add more items...
]

export function InventoryList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(inventoryData.map(item => item.category)))]

  const filteredInventory = inventoryData.filter(item => 
    (selectedCategory === "all" || item.category === selectedCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search inventory..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md p-2 hover:border-primary transition-colors"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
          <CardDescription>Manage your inventory items</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Cost/Unit</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow 
                  key={item.id}
                  className="hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.quantity} {item.unit}
                    {item.quantity <= item.minimumStock && (
                      <span className="ml-2 px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">
                        Low Stock
                      </span>
                    )}
                  </TableCell>
                  <TableCell>${item.costPerUnit.toFixed(2)}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    {item.expiryDate && new Date(item.expiryDate) < new Date() ? (
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">
                        Expired
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        In Stock
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 