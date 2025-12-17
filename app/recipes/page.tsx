"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Search, Plus, Clock, Users as UsersIcon, MoreVertical, Edit, Trash2, Copy, Filter, ChefHat } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface Recipe {
  id: string
  name: string
  category: string
  prepTime: string
  servings: number
  ingredients: string[]
  instructions?: string
  image: string
  available: boolean
  difficulty?: string
}

export default function RecipesPage() {
  const { toast } = useToast()
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Spicy Ramen",
      category: "Main Course",
      prepTime: "30 mins",
      servings: 2,
      ingredients: ["Noodles", "Chicken", "Vegetables", "Spicy Sauce"],
      instructions: "1. Boil noodles\n2. Cook chicken\n3. Add vegetables and sauce\n4. Serve hot",
      image: "/food/ramen.jpg",
      available: true,
      difficulty: "Medium"
    },
    {
      id: "2",
      name: "Chicken Katsu",
      category: "Main Course",
      prepTime: "45 mins",
      servings: 1,
      ingredients: ["Chicken Breast", "Breadcrumbs", "Rice", "Eggs"],
      instructions: "1. Pound chicken\n2. Coat with breadcrumbs\n3. Deep fry\n4. Serve with rice",
      image: "/food/katsu.jpg",
      available: false,
      difficulty: "Hard"
    },
    {
      id: "3",
      name: "Caesar Salad",
      category: "Appetizer",
      prepTime: "15 mins",
      servings: 2,
      ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
      instructions: "1. Wash lettuce\n2. Add croutons and cheese\n3. Toss with dressing",
      image: "/food/appetizers.jpg",
      available: true,
      difficulty: "Easy"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    name: "",
    category: "Main Course",
    prepTime: "",
    servings: 1,
    ingredients: [],
    instructions: "",
    image: "/food/default.jpg",
    available: true,
    difficulty: "Medium"
  })
  const [ingredientInput, setIngredientInput] = useState("")

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || recipe.category === filterCategory
    const matchesAvailability = filterAvailability === "all" || 
      (filterAvailability === "available" && recipe.available) ||
      (filterAvailability === "unavailable" && !recipe.available)
    return matchesSearch && matchesCategory && matchesAvailability
  })

  const categories = Array.from(new Set(recipes.map(r => r.category)))

  const handleAddRecipe = () => {
    if (!newRecipe.name || !newRecipe.prepTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const recipe: Recipe = {
      id: Date.now().toString(),
      name: newRecipe.name!,
      category: newRecipe.category || "Main Course",
      prepTime: newRecipe.prepTime!,
      servings: newRecipe.servings || 1,
      ingredients: newRecipe.ingredients || [],
      instructions: newRecipe.instructions,
      image: newRecipe.image || "/food/default.jpg",
      available: newRecipe.available ?? true,
      difficulty: newRecipe.difficulty || "Medium"
    }

    setRecipes([...recipes, recipe])
    setIsAddDialogOpen(false)
    resetNewRecipe()
    
    toast({
      title: "Success!",
      description: `Recipe "${recipe.name}" has been added.`,
    })
  }

  const handleEditRecipe = () => {
    if (!selectedRecipe) return

    setRecipes(recipes.map(r =>
      r.id === selectedRecipe.id ? selectedRecipe : r
    ))
    setIsEditDialogOpen(false)
    
    toast({
      title: "Success!",
      description: `Recipe "${selectedRecipe.name}" has been updated.`,
    })
  }

  const handleDeleteRecipe = () => {
    if (!selectedRecipe) return

    setRecipes(recipes.filter(r => r.id !== selectedRecipe.id))
    setIsDeleteDialogOpen(false)
    
    toast({
      title: "Success!",
      description: `Recipe "${selectedRecipe.name}" has been deleted.`,
    })
  }

  const handleDuplicateRecipe = (recipe: Recipe) => {
    const duplicate: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      name: `${recipe.name} (Copy)`
    }
    setRecipes([...recipes, duplicate])
    
    toast({
      title: "Success!",
      description: `Recipe "${recipe.name}" has been duplicated.`,
    })
  }

  const resetNewRecipe = () => {
    setNewRecipe({
      name: "",
      category: "Main Course",
      prepTime: "",
      servings: 1,
      ingredients: [],
      instructions: "",
      image: "/food/default.jpg",
      available: true,
      difficulty: "Medium"
    })
    setIngredientInput("")
  }

  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setNewRecipe({
        ...newRecipe,
        ingredients: [...(newRecipe.ingredients || []), ingredientInput.trim()]
      })
      setIngredientInput("")
    }
  }

  const removeIngredient = (index: number) => {
    setNewRecipe({
      ...newRecipe,
      ingredients: newRecipe.ingredients?.filter((_, i) => i !== index) || []
    })
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recipes</h2>
          <p className="text-muted-foreground">Manage your restaurant recipes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {(filterCategory !== "all" || filterAvailability !== "all") && (
                  <Badge className="ml-2" variant="secondary">
                    {(filterCategory !== "all" ? 1 : 0) + (filterAvailability !== "all" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <Label className="text-xs text-muted-foreground">Category</Label>
                <div className="mt-2 space-y-1">
                  <DropdownMenuItem onClick={() => setFilterCategory("all")}>
                    All Categories
                  </DropdownMenuItem>
                  {categories.map(cat => (
                    <DropdownMenuItem key={cat} onClick={() => setFilterCategory(cat)}>
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </div>
                <Label className="text-xs text-muted-foreground mt-4 block">Availability</Label>
                <div className="mt-2 space-y-1">
                  <DropdownMenuItem onClick={() => setFilterAvailability("all")}>
                    All Items
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterAvailability("available")}>
                    Available
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterAvailability("unavailable")}>
                    Unavailable
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Recipe
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Recipe</DialogTitle>
                <DialogDescription>
                  Create a new recipe for your menu
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Recipe Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Spicy Ramen"
                      value={newRecipe.name}
                      onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newRecipe.category}
                        onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            {newRecipe.difficulty}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setNewRecipe({ ...newRecipe, difficulty: "Easy" })}>
                            Easy
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setNewRecipe({ ...newRecipe, difficulty: "Medium" })}>
                            Medium
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setNewRecipe({ ...newRecipe, difficulty: "Hard" })}>
                            Hard
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="prepTime">Prep Time *</Label>
                      <Input
                        id="prepTime"
                        placeholder="e.g., 30 mins"
                        value={newRecipe.prepTime}
                        onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="servings">Servings</Label>
                      <Input
                        id="servings"
                        type="number"
                        value={newRecipe.servings}
                        onChange={(e) => setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="/food/recipe-image.jpg"
                      value={newRecipe.image}
                      onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Ingredients</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add an ingredient"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                      />
                      <Button type="button" onClick={addIngredient}>Add</Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newRecipe.ingredients?.map((ing, idx) => (
                        <Badge key={idx} variant="secondary" className="px-3 py-1">
                          {ing}
                          <button
                            onClick={() => removeIngredient(idx)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Step-by-step instructions"
                      className="min-h-[150px]"
                      value={newRecipe.instructions}
                      onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="available"
                      checked={newRecipe.available}
                      onChange={(e) => setNewRecipe({ ...newRecipe, available: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="available" className="cursor-pointer">
                      All ingredients available
                    </Label>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetNewRecipe(); }}>
                  Cancel
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAddRecipe}>
                  Add Recipe
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Showing {filteredRecipes.length} of {recipes.length} recipes</span>
        <span>•</span>
        <span>{recipes.filter(r => r.available).length} available</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative h-48">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge 
                className={`absolute top-2 left-2 ${
                  recipe.available 
                    ? "bg-green-500" 
                    : "bg-red-500"
                }`}
              >
                {recipe.available ? "Available" : "Missing Ingredients"}
              </Badge>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setSelectedRecipe(recipe);
                      setIsViewDialogOpen(true);
                    }}>
                      <ChefHat className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setSelectedRecipe({ ...recipe });
                      setIsEditDialogOpen(true);
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateRecipe(recipe)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        setSelectedRecipe(recipe);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg">{recipe.name}</h3>
                <Badge variant="outline" className="ml-2">{recipe.difficulty}</Badge>
              </div>
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
                  {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{recipe.ingredients.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No recipes found matching your criteria</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("all");
              setFilterAvailability("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* View Recipe Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedRecipe?.name}</DialogTitle>
            <DialogDescription>{selectedRecipe?.category}</DialogDescription>
          </DialogHeader>
          {selectedRecipe && (
            <div className="space-y-4">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Prep Time</Label>
                  <p className="font-medium">{selectedRecipe.prepTime}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Servings</Label>
                  <p className="font-medium">{selectedRecipe.servings}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Difficulty</Label>
                  <p className="font-medium">{selectedRecipe.difficulty}</p>
                </div>
              </div>
              <div>
                <Label>Ingredients</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <Badge key={idx} variant="secondary">{ing}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Instructions</Label>
                <p className="mt-2 text-sm whitespace-pre-wrap">{selectedRecipe.instructions}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog - Similar to Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogDescription>Update recipe information</DialogDescription>
          </DialogHeader>
          {selectedRecipe && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Recipe Name</Label>
                <Input
                  id="edit-name"
                  value={selectedRecipe.name}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={selectedRecipe.category}
                    onChange={(e) => setSelectedRecipe({ ...selectedRecipe, category: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-prepTime">Prep Time</Label>
                  <Input
                    id="edit-prepTime"
                    value={selectedRecipe.prepTime}
                    onChange={(e) => setSelectedRecipe({ ...selectedRecipe, prepTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-available"
                  checked={selectedRecipe.available}
                  onChange={(e) => setSelectedRecipe({ ...selectedRecipe, available: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="edit-available" className="cursor-pointer">
                  All ingredients available
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleEditRecipe}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Recipe</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedRecipe?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRecipe}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
