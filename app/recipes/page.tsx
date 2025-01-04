"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Clock, Users as UsersIcon } from "lucide-react"
import Image from "next/image"

export default function RecipesPage() {
  const recipes = [
    {
      name: "Spicy Ramen",
      category: "Main Course",
      prepTime: "30 mins",
      servings: 2,
      ingredients: ["Noodles", "Chicken", "Vegetables"],
      image: "/food/ramen.jpg",
      available: true
    },
    {
      name: "Chicken Katsu",
      category: "Main Course",
      prepTime: "45 mins",
      servings: 1,
      ingredients: ["Chicken Breast", "Breadcrumbs", "Rice"],
      image: "/food/katsu.jpg",
      available: false
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Recipes</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Recipe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
              />
              <Badge 
                className={`absolute top-2 right-2 ${
                  recipe.available 
                    ? "bg-green-500" 
                    : "bg-red-500"
                }`}
              >
                {recipe.available ? "Available" : "Missing Ingredients"}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{recipe.name}</h3>
              <p className="text-sm text-muted-foreground">{recipe.category}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {recipe.prepTime}
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  {recipe.servings} servings
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 