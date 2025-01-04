"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Plus, Search } from "lucide-react"

export default function CategoriesPage() {
  const categories = [
    {
      name: "Main Dishes",
      items: 24,
      image: "/food/main-dishes.jpg",
      status: "Active"
    },
    {
      name: "Appetizers",
      items: 18,
      image: "/food/appetizers.jpg",
      status: "Active"
    },
    {
      name: "Desserts",
      items: 12,
      image: "/food/desserts.jpg",
      status: "Active"
    },
    {
      name: "Beverages",
      items: 15,
      image: "/food/beverages.jpg",
      status: "Active"
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">{category.items} items</span>
                  <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full">
                    {category.status}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

