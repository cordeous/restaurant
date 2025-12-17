"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Filter, Grid, List, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FoodImage } from "@/components/food-image"

interface Category {
  id: string
  name: string
  items: number
  image: string
  status: string
  description?: string
  foodType: "main" | "appetizer" | "dessert" | "beverage" | "ramen" | "katsu" | "salad" | "noodles"
  featured?: boolean
}

export default function CategoriesPage() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Main Dishes",
      items: 24,
      image: "/food/main-dishes.jpg",
      status: "Active",
      description: "Hearty main courses including steaks, seafood, and chef specials",
      foodType: "main",
      featured: true
    },
    {
      id: "2",
      name: "Appetizers",
      items: 18,
      image: "/food/appetizers.jpg",
      status: "Active",
      description: "Delicious starters and small bites to begin your meal",
      foodType: "appetizer"
    },
    {
      id: "3",
      name: "Desserts",
      items: 12,
      image: "/food/desserts.jpg",
      status: "Active",
      description: "Sweet treats, cakes, and indulgent desserts",
      foodType: "dessert"
    },
    {
      id: "4",
      name: "Beverages",
      items: 15,
      image: "/food/beverages.jpg",
      status: "Active",
      description: "Refreshing drinks, juices, and specialty beverages",
      foodType: "beverage"
    },
    {
      id: "5",
      name: "Ramen & Noodles",
      items: 10,
      image: "/food/ramen.jpg",
      status: "Active",
      description: "Authentic Japanese ramen and Asian noodle dishes",
      foodType: "ramen",
      featured: true
    },
    {
      id: "6",
      name: "Fresh Salads",
      items: 8,
      image: "/food/salads.jpg",
      status: "Active",
      description: "Healthy and fresh salad options with various dressings",
      foodType: "salad"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    items: 0,
    image: "/food/default.jpg",
    status: "Active",
    description: "",
    foodType: "main" as Category["foodType"]
  })

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || category.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Please enter a category name",
        variant: "destructive",
      })
      return
    }

    const category: Category = {
      id: Date.now().toString(),
      ...newCategory
    }

    setCategories([...categories, category])
    setIsAddDialogOpen(false)
    setNewCategory({
      name: "",
      items: 0,
      image: "/food/default.jpg",
      status: "Active",
      description: "",
      foodType: "main"
    })
    
    toast({
      title: "Success! 🎉",
      description: `Category "${category.name}" has been added.`,
    })
  }

  const handleEditCategory = () => {
    if (!selectedCategory) return

    setCategories(categories.map(cat =>
      cat.id === selectedCategory.id ? selectedCategory : cat
    ))
    setIsEditDialogOpen(false)
    
    toast({
      title: "Success! ✅",
      description: `Category "${selectedCategory.name}" has been updated.`,
    })
  }

  const handleDeleteCategory = () => {
    if (!selectedCategory) return

    setCategories(categories.filter(cat => cat.id !== selectedCategory.id))
    setIsDeleteDialogOpen(false)
    
    toast({
      title: "Deleted",
      description: `Category "${selectedCategory.name}" has been deleted.`,
    })
  }

  return (
    <div className="flex-1 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your food categories</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${viewMode === "grid" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${viewMode === "list" ? "bg-white dark:bg-gray-700 shadow-sm" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Category</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new category for your menu items
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Salads"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of this category"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="items">Items Count</Label>
                    <Input
                      id="items"
                      type="number"
                      value={newCategory.items}
                      onChange={(e) => setNewCategory({ ...newCategory, items: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Food Type</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start capitalize">
                          {newCategory.foodType}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {["main", "appetizer", "dessert", "beverage", "ramen", "salad", "noodles"].map(type => (
                          <DropdownMenuItem 
                            key={type}
                            onClick={() => setNewCategory({ ...newCategory, foodType: type as Category["foodType"] })}
                            className="capitalize"
                          >
                            {type}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" onClick={handleAddCategory}>
                  Add Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-10 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto border border-gray-200/50 dark:border-gray-700/50 shadow-sm bg-white dark:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {filterStatus !== "all" && (
                <Badge className="ml-2" variant="secondary">1</Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("Inactive")}>
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
        <span>Showing {filteredCategories.length} of {categories.length} categories</span>
      </div>

      {/* Categories Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 stagger-children">
          {filteredCategories.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg card-hover group transition-all duration-300"
            >
              <div className="relative h-40 sm:h-48">
                <FoodImage
                  src={category.image}
                  alt={category.name}
                  category={category.foodType}
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  {category.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {
                        setSelectedCategory({ ...category })
                        setIsEditDialogOpen(true)
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1">{category.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">{category.items} items</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        category.status === "Active"
                          ? "bg-green-500/20 text-green-100 border-green-500/30"
                          : "bg-red-500/20 text-red-100 border-red-500/30"
                      }`}
                    >
                      {category.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg bg-white dark:bg-gray-800 transition-all duration-300">
              <CardContent className="p-3 sm:p-4 flex gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <FoodImage
                    src={category.image}
                    alt={category.name}
                    category={category.foodType}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{category.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedCategory({ ...category })
                          setIsEditDialogOpen(true)
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedCategory(category)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="secondary">{category.items} items</Badge>
                    <Badge
                      variant="secondary"
                      className={
                        category.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }
                    >
                      {category.status}
                    </Badge>
                    {category.featured && (
                      <Badge className="bg-orange-100 text-orange-600">Featured</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-muted-foreground">No categories found matching your criteria</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("")
              setFilterStatus("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category information</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Category Name</Label>
                <Input
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={selectedCategory.description}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Items Count</Label>
                  <Input
                    type="number"
                    value={selectedCategory.items}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, items: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {selectedCategory.status}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedCategory({ ...selectedCategory, status: "Active" })}>
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory({ ...selectedCategory, status: "Inactive" })}>
                        Inactive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" onClick={handleEditCategory}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory} className="w-full sm:w-auto">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
