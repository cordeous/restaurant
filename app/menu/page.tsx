"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronUpIcon, ChevronDownIcon, EditIcon, TrashIcon } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  price: number
  category: string
  recipeId: number
}

interface Recipe {
  id: number
  name: string
  ingredients: { itemId: number; quantity: number }[]
  steps: string[]
  available?: boolean
}

interface InventoryItem {
  id: number
  name: string
  quantity: number
  unit: string
  minThreshold: number
  maxThreshold: number
}

const initialMenu: MenuItem[] = [
  { id: 1, name: "Tomato Basil Pasta", price: 12.99, category: "Main Course", recipeId: 1 },
  { id: 2, name: "Grilled Chicken", price: 14.99, category: "Main Course", recipeId: 2 },
]

const initialRecipes: Recipe[] = [
  {
    id: 1,
    name: "Tomato Basil Pasta",
    ingredients: [
      { itemId: 1, quantity: 0.5 },
      { itemId: 3, quantity: 0.05 },
      { itemId: 4, quantity: 0.2 },
      { itemId: 5, quantity: 0.05 },
    ],
    steps: [
      "Boil water and cook pasta according to package instructions.",
      "In a large pan, heat olive oil over medium heat.",
      "Add chopped tomatoes and cook for 5 minutes.",
      "Add torn basil leaves and cook for another 2 minutes.",
      "Drain pasta and add it to the pan with the sauce.",
      "Toss everything together and serve hot."
    ]
  },
  {
    id: 2,
    name: "Grilled Chicken",
    ingredients: [
      { itemId: 2, quantity: 0.3 },
      { itemId: 3, quantity: 0.02 },
    ],
    steps: [
      "Preheat the grill to medium-high heat.",
      "Brush chicken breasts with olive oil and season with salt and pepper.",
      "Grill chicken for 6-8 minutes per side, or until fully cooked.",
      "Let the chicken rest for 5 minutes before serving."
    ]
  },
]

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Tomatoes", quantity: 50, unit: "kg", minThreshold: 10, maxThreshold: 100 },
  { id: 2, name: "Chicken Breast", quantity: 30, unit: "kg", minThreshold: 5, maxThreshold: 50 },
  { id: 3, name: "Olive Oil", quantity: 10, unit: "liters", minThreshold: 2, maxThreshold: 20 },
  { id: 4, name: "Pasta", quantity: 100, unit: "kg", minThreshold: 20, maxThreshold: 200 },
  { id: 5, name: "Basil", quantity: 2, unit: "kg", minThreshold: 0.5, maxThreshold: 5 },
]

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu)
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [newItem, setNewItem] = useState({ name: "", price: 0, category: "", recipeId: 0 })
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    updateRecipeAvailability()
  }, [inventory])

  const addMenuItem = () => {
    if (newItem.name && newItem.price > 0 && newItem.category && newItem.recipeId) {
      setMenu([...menu, { ...newItem, id: menu.length + 1 }])
      setNewItem({ name: "", price: 0, category: "", recipeId: 0 })
      toast({
        title: "Menu item added",
        description: `${newItem.name} has been added to the menu.`,
      })
    } else {
      toast({
        title: "Invalid input",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
    }
  }

  const removeMenuItem = (id: number) => {
    setMenu(menu.filter((item) => item.id !== id))
    toast({
      title: "Menu item removed",
      description: "The item has been removed from the menu.",
    })
  }

  const getIngredientName = (itemId: number) => {
    const item = inventory.find((i) => i.id === itemId)
    return item ? item.name : "Unknown"
  }

  const updateRecipeAvailability = () => {
    const updatedRecipes = recipes.map(recipe => {
      const canMake = recipe.ingredients.every(ingredient => {
        const inventoryItem = inventory.find(item => item.id === ingredient.itemId)
        return inventoryItem && inventoryItem.quantity >= ingredient.quantity
      })
      return { ...recipe, available: canMake }
    })
    setRecipes(updatedRecipes)
  }

  const toggleRecipeExpansion = (id: number) => {
    setExpandedRecipe(expandedRecipe === id ? null : id)
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold">Menu Management</h1>
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Current Menu</CardTitle>
              <CardDescription>Manage your menu items here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
                <Input
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                />
                <Input
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />
                <Select onValueChange={(value) => setNewItem({ ...newItem, recipeId: Number(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipe" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id.toString()}>
                        {recipe.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addMenuItem}>Add Menu Item</Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menu.map((item) => {
                      const recipe = recipes.find(r => r.id === item.recipeId)
                      return (
                        <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell>{item.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <Badge variant={recipe?.available ? "default" : "destructive"}>
                              {recipe?.available ? "Available" : "Unavailable"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="mr-2">
                              <EditIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => removeMenuItem(item.id)}>
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recipes">
          <Card>
            <CardHeader>
              <CardTitle>Available Recipes</CardTitle>
              <CardDescription>Recipes for menu items.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className={`hover:shadow-md transition-shadow ${recipe.available ? 'bg-green-50' : 'bg-red-50'}`}>
                    <CardHeader className="cursor-pointer" onClick={() => toggleRecipeExpansion(recipe.id)}>
                      <CardTitle className="flex justify-between items-center">
                        {recipe.name}
                        <div className="flex items-center">
                          <Badge variant={recipe.available ? "default" : "destructive"} className="mr-2">
                            {recipe.available ? "Available" : "Unavailable"}
                          </Badge>
                          {expandedRecipe === recipe.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    {expandedRecipe === recipe.id && (
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Ingredients:</h4>
                            <ul className="list-disc list-inside">
                              {recipe.ingredients.map((ingredient, index) => {
                                const inventoryItem = inventory.find(item => item.id === ingredient.itemId)
                                const isAvailable = inventoryItem && inventoryItem.quantity >= ingredient.quantity
                                return (
                                  <li key={index} className={isAvailable ? 'text-green-600' : 'text-red-600'}>
                                    {getIngredientName(ingredient.itemId)}: {ingredient.quantity} {inventoryItem?.unit}
                                    {!isAvailable && " (Insufficient)"}
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Steps:</h4>
                            <ol className="list-decimal list-inside">
                              {recipe.steps.map((step, index) => (
                                <li key={index} className="mb-2">{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

