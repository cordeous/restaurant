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
import { Search, Plus, Clock, Users as UsersIcon, MoreVertical, Edit, Trash2, Copy, Filter, ChefHat, Flame, Star, Heart, DollarSign, Leaf, Grid, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FoodImage } from "@/components/food-image"

interface Recipe {
  id: string
  name: string
  category: string
  prepTime: string
  cookTime?: string
  servings: number
  ingredients: string[]
  instructions?: string
  image: string
  available: boolean
  difficulty: "Easy" | "Medium" | "Hard"
  foodType: "main" | "appetizer" | "dessert" | "beverage" | "ramen" | "katsu" | "salad" | "noodles"
  calories?: number
  price?: number
  rating?: number
  reviews?: number
  spicyLevel?: number
  isVegetarian?: boolean
  isPopular?: boolean
  chef?: string
  nutritionInfo?: {
    protein: number
    carbs: number
    fat: number
  }
}

export default function RecipesPage() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])
  
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      name: "Spicy Ramen",
      category: "Main Course",
      prepTime: "15 mins",
      cookTime: "15 mins",
      servings: 2,
      ingredients: ["Ramen Noodles", "Pork Belly", "Soft-boiled Egg", "Nori", "Green Onion", "Tonkotsu Broth", "Spicy Miso Paste"],
      instructions: "1. Prepare tonkotsu broth\n2. Cook noodles al dente\n3. Slice chashu pork\n4. Assemble bowl with toppings\n5. Add soft-boiled egg\n6. Garnish with nori and green onion",
      image: "/food/ramen.jpg",
      available: true,
      difficulty: "Medium",
      foodType: "ramen",
      calories: 650,
      price: 24.99,
      rating: 4.8,
      reviews: 312,
      spicyLevel: 4,
      isPopular: true,
      chef: "Chef Tanaka",
      nutritionInfo: { protein: 28, carbs: 65, fat: 22 }
    },
    {
      id: "2",
      name: "Chicken Katsu",
      category: "Main Course",
      prepTime: "20 mins",
      cookTime: "25 mins",
      servings: 1,
      ingredients: ["Chicken Breast", "Panko Breadcrumbs", "Egg", "Flour", "Japanese Curry", "Steamed Rice"],
      instructions: "1. Pound chicken breast\n2. Coat in flour, egg, then panko\n3. Deep fry until golden\n4. Prepare curry sauce\n5. Serve over rice with curry",
      image: "/food/katsu.jpg",
      available: false,
      difficulty: "Hard",
      foodType: "katsu",
      calories: 780,
      price: 26.99,
      rating: 4.6,
      reviews: 156,
      spicyLevel: 1,
      chef: "Chef Yamamoto"
    },
    {
      id: "3",
      name: "Caesar Salad",
      category: "Appetizer",
      prepTime: "10 mins",
      servings: 2,
      ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing", "Anchovies", "Lemon"],
      instructions: "1. Wash and chop romaine\n2. Make fresh dressing\n3. Toss with croutons\n4. Top with shaved parmesan",
      image: "/food/salad.jpg",
      available: true,
      difficulty: "Easy",
      foodType: "salad",
      calories: 280,
      price: 14.99,
      rating: 4.5,
      reviews: 98,
      isVegetarian: true,
      nutritionInfo: { protein: 8, carbs: 12, fat: 22 }
    },
    {
      id: "4",
      name: "Miso Soup",
      category: "Appetizer",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: 4,
      ingredients: ["Dashi Stock", "Miso Paste", "Tofu", "Wakame Seaweed", "Green Onion"],
      instructions: "1. Heat dashi stock\n2. Dissolve miso paste\n3. Add tofu cubes\n4. Add wakame\n5. Garnish with green onion",
      image: "/food/appetizers.jpg",
      available: true,
      difficulty: "Easy",
      foodType: "appetizer",
      calories: 84,
      price: 6.99,
      rating: 4.7,
      reviews: 245,
      isVegetarian: true,
      isPopular: true
    },
    {
      id: "5",
      name: "Chocolate Lava Cake",
      category: "Dessert",
      prepTime: "15 mins",
      cookTime: "12 mins",
      servings: 2,
      ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla Ice Cream"],
      instructions: "1. Melt chocolate and butter\n2. Whisk eggs and sugar\n3. Combine mixtures\n4. Bake at 425°F for 12 mins\n5. Serve with ice cream",
      image: "/food/desserts.jpg",
      available: true,
      difficulty: "Medium",
      foodType: "dessert",
      calories: 450,
      price: 12.99,
      rating: 4.9,
      reviews: 189,
      chef: "Chef Pierre"
    },
    {
      id: "6",
      name: "Pad Thai Noodles",
      category: "Main Course",
      prepTime: "15 mins",
      cookTime: "10 mins",
      servings: 2,
      ingredients: ["Rice Noodles", "Shrimp", "Tofu", "Bean Sprouts", "Peanuts", "Tamarind Sauce", "Lime"],
      instructions: "1. Soak rice noodles\n2. Stir-fry shrimp and tofu\n3. Add noodles and sauce\n4. Toss with bean sprouts\n5. Top with peanuts and lime",
      image: "/food/noodles.jpg",
      available: true,
      difficulty: "Medium",
      foodType: "noodles",
      calories: 620,
      price: 22.99,
      rating: 4.7,
      reviews: 167,
      spicyLevel: 2
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
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
    difficulty: "Medium",
    foodType: "main"
  })
  const [ingredientInput, setIngredientInput] = useState("")

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || recipe.category === filterCategory
    const matchesDifficulty = filterDifficulty === "all" || recipe.difficulty === filterDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const categories = Array.from(new Set(recipes.map(r => r.category)))

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

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
      difficulty: newRecipe.difficulty || "Medium",
      foodType: newRecipe.foodType || "main",
      rating: 0,
      reviews: 0
    }

    setRecipes([...recipes, recipe])
    setIsAddDialogOpen(false)
    resetNewRecipe()
    
    toast({
      title: "Success! 🎉",
      description: `Recipe "${recipe.name}" has been added.`,
    })
  }

  const handleDeleteRecipe = () => {
    if (!selectedRecipe) return
    setRecipes(recipes.filter(r => r.id !== selectedRecipe.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Deleted",
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
      title: "Duplicated! 📋",
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
      difficulty: "Medium",
      foodType: "main"
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

  const renderSpicyLevel = (level: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Flame key={i} className={`h-3 w-3 ${i <= level ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} />
      ))}
    </div>
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-600"
      case "Medium": return "bg-yellow-100 text-yellow-600"
      case "Hard": return "bg-red-100 text-red-600"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="flex-1 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Recipes</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your restaurant recipes</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Recipe</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Recipe</DialogTitle>
                <DialogDescription>Create a new recipe for your menu</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid gap-2">
                    <Label>Recipe Name *</Label>
                    <Input
                      placeholder="e.g., Spicy Ramen"
                      value={newRecipe.name}
                      onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Category</Label>
                      <Input
                        value={newRecipe.category}
                        onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Difficulty</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            {newRecipe.difficulty}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {["Easy", "Medium", "Hard"].map(d => (
                            <DropdownMenuItem key={d} onClick={() => setNewRecipe({ ...newRecipe, difficulty: d as Recipe["difficulty"] })}>
                              {d}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Prep Time *</Label>
                      <Input
                        placeholder="e.g., 30 mins"
                        value={newRecipe.prepTime}
                        onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Servings</Label>
                      <Input
                        type="number"
                        value={newRecipe.servings}
                        onChange={(e) => setNewRecipe({ ...newRecipe, servings: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4 mt-4">
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
                            onClick={() => setNewRecipe({
                              ...newRecipe,
                              ingredients: newRecipe.ingredients?.filter((_, i) => i !== idx) || []
                            })}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Instructions</Label>
                    <Textarea
                      placeholder="Step-by-step instructions"
                      className="min-h-[120px]"
                      value={newRecipe.instructions}
                      onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetNewRecipe(); }} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" onClick={handleAddRecipe}>
                  Add Recipe
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            className="pl-10 bg-white border-0 shadow-soft"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none border-0 shadow-soft bg-white">
                <Filter className="h-4 w-4 mr-2" />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterCategory("all")}>All</DropdownMenuItem>
              {categories.map(cat => (
                <DropdownMenuItem key={cat} onClick={() => setFilterCategory(cat)}>{cat}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none border-0 shadow-soft bg-white">
                Difficulty
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterDifficulty("all")}>All</DropdownMenuItem>
              {["Easy", "Medium", "Hard"].map(d => (
                <DropdownMenuItem key={d} onClick={() => setFilterDifficulty(d)}>{d}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{filteredRecipes.length} recipes</span>
        <span>•</span>
        <span className="text-green-600">{recipes.filter(r => r.available).length} available</span>
      </div>

      {/* Recipes Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 stagger-children">
          {filteredRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="overflow-hidden border-0 shadow-soft card-hover group cursor-pointer"
              onClick={() => { setSelectedRecipe(recipe); setIsViewDialogOpen(true); }}
            >
              <div className="relative h-40 sm:h-48">
                <FoodImage
                  src={recipe.image}
                  alt={recipe.name}
                  category={recipe.foodType}
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <Badge className={`${getDifficultyColor(recipe.difficulty)} border-0`}>
                    {recipe.difficulty}
                  </Badge>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                      className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <button className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                          <MoreVertical className="h-4 w-4 text-white" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicateRecipe(recipe); }}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={(e) => { 
                          e.stopPropagation(); 
                          setSelectedRecipe(recipe); 
                          setIsDeleteDialogOpen(true); 
                        }}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-1">{recipe.name}</h3>
                      <p className="text-sm text-white/80">{recipe.category}</p>
                    </div>
                    {recipe.price && (
                      <span className="text-lg font-bold ml-2">${recipe.price}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-3">
                {/* Stats row */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  {recipe.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{recipe.rating}</span>
                      <span>({recipe.reviews})</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="h-4 w-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 flex-wrap">
                  {recipe.calories && (
                    <Badge variant="secondary" className="text-xs">{recipe.calories} cal</Badge>
                  )}
                  {recipe.spicyLevel && recipe.spicyLevel > 0 && (
                    <div>{renderSpicyLevel(recipe.spicyLevel)}</div>
                  )}
                  {recipe.isVegetarian && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-600">
                      <Leaf className="h-3 w-3 mr-1" />
                      Veg
                    </Badge>
                  )}
                  {recipe.isPopular && (
                    <Badge className="text-xs bg-orange-100 text-orange-600">Popular</Badge>
                  )}
                </div>

                {/* Availability */}
                <Badge
                  className={`w-full justify-center ${
                    recipe.available
                      ? "bg-green-100 text-green-600 hover:bg-green-100"
                      : "bg-red-100 text-red-600 hover:bg-red-100"
                  }`}
                >
                  {recipe.available ? "Available" : "Missing Ingredients"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="overflow-hidden border-0 shadow-soft hover-lift cursor-pointer"
              onClick={() => { setSelectedRecipe(recipe); setIsViewDialogOpen(true); }}
            >
              <CardContent className="p-3 sm:p-4 flex gap-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <FoodImage src={recipe.image} alt={recipe.name} category={recipe.foodType} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{recipe.name}</h3>
                      <p className="text-sm text-muted-foreground">{recipe.category}</p>
                    </div>
                    {recipe.price && (
                      <span className="text-lg font-bold text-orange-500">${recipe.price}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
                    {recipe.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                    )}
                    <span>{recipe.prepTime}</span>
                    <span>{recipe.servings} servings</span>
                    {recipe.calories && <span>{recipe.calories} cal</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                    <Badge className={recipe.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}>
                      {recipe.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-muted-foreground">No recipes found</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearchTerm(""); setFilterCategory("all"); setFilterDifficulty("all"); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* View Recipe Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {selectedRecipe && (
            <>
              <div className="relative h-48 sm:h-64">
                <FoodImage src={selectedRecipe.image} alt={selectedRecipe.name} category={selectedRecipe.foodType} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold">{selectedRecipe.name}</h3>
                  <p className="text-white/80">{selectedRecipe.category}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(selectedRecipe.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(selectedRecipe.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                {/* Quick stats */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Clock className="h-5 w-5 mx-auto text-orange-500" />
                    <p className="text-xs text-muted-foreground mt-1">Prep</p>
                    <p className="font-medium text-sm">{selectedRecipe.prepTime}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <UsersIcon className="h-5 w-5 mx-auto text-orange-500" />
                    <p className="text-xs text-muted-foreground mt-1">Serves</p>
                    <p className="font-medium text-sm">{selectedRecipe.servings}</p>
                  </div>
                  {selectedRecipe.calories && (
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Flame className="h-5 w-5 mx-auto text-orange-500" />
                      <p className="text-xs text-muted-foreground mt-1">Calories</p>
                      <p className="font-medium text-sm">{selectedRecipe.calories}</p>
                    </div>
                  )}
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <ChefHat className="h-5 w-5 mx-auto text-orange-500" />
                    <p className="text-xs text-muted-foreground mt-1">Difficulty</p>
                    <p className="font-medium text-sm">{selectedRecipe.difficulty}</p>
                  </div>
                </div>

                {/* Rating */}
                {selectedRecipe.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{selectedRecipe.rating}</span>
                    <span className="text-muted-foreground">({selectedRecipe.reviews} reviews)</span>
                  </div>
                )}

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <Badge key={idx} variant="secondary" className="px-3 py-1">{ing}</Badge>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                {selectedRecipe.instructions && (
                  <div>
                    <h4 className="font-semibold mb-2">Instructions</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRecipe.instructions}</p>
                  </div>
                )}

                {/* Price */}
                {selectedRecipe.price && (
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                    <span className="font-medium">Price</span>
                    <span className="text-2xl font-bold text-orange-500">${selectedRecipe.price}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Recipe</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedRecipe?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRecipe} className="w-full sm:w-auto">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
