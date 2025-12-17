"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import Link from "next/link"
import { ShoppingCart, Star, TrendingUp, Users, DollarSign, Flame, Heart, ChevronRight, Sparkles, Timer, Leaf } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FoodImage } from "@/components/food-image"

interface FoodItem {
  id: string
  name: string
  description: string
  time: string
  image: string
  category: "main" | "appetizer" | "dessert" | "beverage" | "ramen" | "katsu" | "salad" | "noodles"
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  status: "pending" | "delivered" | "finished"
  calories?: number
  prepTime?: string
  ingredients?: string[]
  spicyLevel?: number
  isVegetarian?: boolean
  isPopular?: boolean
  isNew?: boolean
}

export default function DashboardPage() {
  const { toast } = useToast()
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [selectedDish, setSelectedDish] = useState<FoodItem | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  const categories = [
    {
      id: "1",
      name: "Indonesian Cuisine",
      description: "Traditional flavors with modern twist",
      image: "/food/indonesian.jpg",
      href: "/inventory",
      items: 24,
      popular: true,
      category: "main" as const
    },
    {
      id: "2",
      name: "Japanese Delights",
      description: "Authentic sushi & ramen",
      image: "/food/japanese.jpg",
      href: "/inventory",
      items: 18,
      popular: true,
      category: "ramen" as const
    },
    {
      id: "3",
      name: "Korean BBQ",
      description: "Grilled perfection",
      image: "/food/korean.jpg",
      href: "/inventory",
      items: 15,
      popular: false,
      category: "main" as const
    },
    {
      id: "4",
      name: "Fresh Salads",
      description: "Healthy & delicious",
      image: "/food/salads.jpg",
      href: "/inventory",
      items: 12,
      popular: false,
      category: "salad" as const
    }
  ]

  const [orders, setOrders] = useState<FoodItem[]>([
    {
      id: "1",
      name: "Sambal Fried Fish",
      description: "Crispy fried fish with spicy sambal sauce, served with fresh vegetables and steamed rice. A perfect blend of Indonesian spices.",
      time: "7 Dec, 18:10",
      image: "/food/sambal-fish.jpg",
      category: "main",
      price: 32.0,
      originalPrice: 38.0,
      rating: 4.8,
      reviews: 234,
      status: "pending",
      calories: 580,
      prepTime: "25 min",
      ingredients: ["Fresh Fish", "Sambal", "Vegetables", "Rice"],
      spicyLevel: 3,
      isPopular: true
    },
    {
      id: "2",
      name: "Archipelago Noodles",
      description: "Stir-fried noodles with chicken katsu, fresh vegetables, and our signature archipelago sauce. A fusion of flavors.",
      time: "7 Dec, 18:10",
      image: "/food/noodles.jpg",
      category: "noodles",
      price: 28.0,
      rating: 4.9,
      reviews: 189,
      status: "pending",
      calories: 720,
      prepTime: "20 min",
      ingredients: ["Egg Noodles", "Chicken", "Vegetables", "Special Sauce"],
      spicyLevel: 2,
      isNew: true
    },
    {
      id: "3",
      name: "Spicy Ramen Bowl",
      description: "Rich tonkotsu broth with perfectly cooked noodles, chashu pork, soft-boiled egg, and fresh toppings.",
      time: "6 Dec, 20:15",
      image: "/food/ramen.jpg",
      category: "ramen",
      price: 24.0,
      rating: 4.7,
      reviews: 312,
      status: "delivered",
      calories: 650,
      prepTime: "15 min",
      ingredients: ["Ramen Noodles", "Pork", "Egg", "Nori", "Green Onion"],
      spicyLevel: 4,
      isPopular: true
    },
    {
      id: "4",
      name: "Chicken Katsu Curry",
      description: "Crispy breaded chicken cutlet served with Japanese curry sauce and fluffy rice.",
      time: "6 Dec, 19:30",
      image: "/food/katsu.jpg",
      category: "katsu",
      price: 26.0,
      rating: 4.6,
      reviews: 156,
      status: "delivered",
      calories: 780,
      prepTime: "30 min",
      ingredients: ["Chicken Breast", "Panko", "Curry Sauce", "Rice"],
      spicyLevel: 1
    },
    {
      id: "5",
      name: "Garden Fresh Salad",
      description: "Mixed greens with cherry tomatoes, cucumber, avocado, and citrus vinaigrette dressing.",
      time: "5 Dec, 12:00",
      image: "/food/salad.jpg",
      category: "salad",
      price: 18.0,
      rating: 4.5,
      reviews: 98,
      status: "finished",
      calories: 280,
      prepTime: "10 min",
      ingredients: ["Mixed Greens", "Tomatoes", "Avocado", "Citrus Dressing"],
      isVegetarian: true
    }
  ])

  const quickStats = [
    {
      title: "Today's Revenue",
      value: "$1,234",
      icon: DollarSign,
      change: "+12%",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Active Orders",
      value: "24",
      icon: ShoppingCart,
      change: "+5",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Total Customers",
      value: "892",
      icon: Users,
      change: "+18%",
      color: "from-purple-500 to-violet-600"
    },
    {
      title: "Popular Items",
      value: "12",
      icon: TrendingUp,
      change: "+3",
      color: "from-orange-500 to-red-500"
    }
  ]

  const handleOrderAgain = (order: FoodItem) => {
    toast({
      title: "Added to Cart! 🛒",
      description: `${order.name} has been added to your cart.`,
    })
    setCart(prev => ({
      ...prev,
      [order.id]: (prev[order.id] || 0) + 1
    }))
  }

  const handleViewDetails = (order: FoodItem) => {
    setSelectedDish(order)
    setIsDetailsOpen(true)
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
    toast({
      title: favorites.includes(id) ? "Removed from favorites" : "Added to favorites ❤️",
      description: favorites.includes(id) ? "Item removed from your favorites" : "You can find this in your favorites",
    })
  }

  const moveToDelivered = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "delivered" } : order
    ))
    toast({
      title: "Order Delivered! 🎉",
      description: "Order has been marked as delivered.",
    })
  }

  const moveToFinished = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "finished" } : order
    ))
    toast({
      title: "Order Completed! ✅",
      description: "Order has been marked as finished.",
    })
  }

  const renderSpicyLevel = (level: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Flame 
            key={i} 
            className={`h-3 w-3 ${i <= level ? 'text-red-500 fill-red-500' : 'text-gray-300 dark:text-gray-600'}`} 
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 sm:space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative px-4 sm:px-8 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 sm:space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Special Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Discount New Menu!
            </h2>
            <p className="text-orange-100 text-base sm:text-lg max-w-md">
              Get Free Shipping Every $20 With No Minimum Purchase. Limited time offer!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-50 shadow-lg shadow-orange-600/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Order Now
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                View Menu
              </Button>
            </div>
          </div>
          <div className="hidden md:block w-64 lg:w-80 h-48 lg:h-56 relative animate-float">
            <FoodImage 
              alt="Food Banner"
              category="main"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card 
              key={stat.title} 
              className="hover-lift cursor-pointer border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg bg-white dark:bg-gray-800 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-green-500 font-medium">{stat.change}</p>
                  </div>
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Categories</h2>
            <p className="text-sm text-muted-foreground hidden sm:block">Explore our food categories</p>
          </div>
          <Link href="/inventory" className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1 transition-colors">
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link href={category.href} key={category.id} className="block">
              <Card className="overflow-hidden card-hover group border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg h-full transition-all duration-300">
                <div className="relative h-32 sm:h-40">
                  <FoodImage
                    src={category.image}
                    alt={category.name}
                    category={category.category}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  {category.popular && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 border-0 shadow-lg">
                      🔥 Popular
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                    <h3 className="font-semibold text-base sm:text-lg">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-1">{category.description}</p>
                    <p className="text-xs text-white/60 mt-1">{category.items} items</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Recent Orders</h2>
            <p className="text-sm text-muted-foreground hidden sm:block">Track and manage your orders</p>
          </div>
          {Object.keys(cart).length > 0 && (
            <Badge variant="secondary" className="px-3 py-1.5 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
              <ShoppingCart className="h-3 w-3 mr-1.5" />
              {Object.values(cart).reduce((a, b) => a + b, 0)} items
            </Badge>
          )}
        </div>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 h-auto p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <TabsTrigger value="pending" className="text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all">
              Pending ({orders.filter(o => o.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="delivered" className="text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all">
              Delivered ({orders.filter(o => o.status === "delivered").length})
            </TabsTrigger>
            <TabsTrigger value="finished" className="text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all">
              Finished ({orders.filter(o => o.status === "finished").length})
            </TabsTrigger>
          </TabsList>
          
          {["pending", "delivered", "finished"].map(status => (
            <TabsContent key={status} value={status} className="space-y-3 sm:space-y-4 mt-4">
              {orders.filter(order => order.status === status).map((order, index) => (
                <Card 
                  key={order.id} 
                  className={`overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ${status === "finished" ? "opacity-70" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      {/* Food Image */}
                      <div 
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer group"
                        onClick={() => handleViewDetails(order)}
                      >
                        <FoodImage
                          src={order.image}
                          alt={order.name}
                          category={order.category}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        {order.originalPrice && (
                          <Badge className="absolute top-1 left-1 bg-red-500 text-[10px] px-1.5 py-0.5">
                            Sale
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{order.name}</h3>
                              {order.isNew && (
                                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] px-1.5">New</Badge>
                              )}
                              {order.isPopular && (
                                <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] px-1.5">Popular</Badge>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-0.5">
                              {order.description}
                            </p>
                          </div>
                          <button 
                            onClick={() => toggleFavorite(order.id)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                          >
                            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${favorites.includes(order.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                          </button>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs sm:text-sm font-medium">{order.rating}</span>
                            <span className="text-xs text-muted-foreground">({order.reviews})</span>
                          </div>
                          {order.prepTime && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Timer className="h-3 w-3" />
                              <span className="text-xs">{order.prepTime}</span>
                            </div>
                          )}
                          {order.calories && (
                            <span className="text-xs text-muted-foreground">{order.calories} cal</span>
                          )}
                          {order.spicyLevel && order.spicyLevel > 0 && (
                            <div className="hidden sm:block">{renderSpicyLevel(order.spicyLevel)}</div>
                          )}
                          {order.isVegetarian && (
                            <Badge variant="outline" className="text-green-600 border-green-200 dark:border-green-800 text-[10px] px-1.5 py-0">
                              <Leaf className="h-2.5 w-2.5 mr-0.5" />
                              Veg
                            </Badge>
                          )}
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between mt-3 gap-2">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-base sm:text-lg text-orange-500">${order.price.toFixed(2)}</span>
                            {order.originalPrice && (
                              <span className="text-xs sm:text-sm text-muted-foreground line-through">${order.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {status === "pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-8 hidden sm:flex"
                                  onClick={() => handleViewDetails(order)}
                                >
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  className="text-xs h-8 bg-orange-500 hover:bg-orange-600"
                                  onClick={() => moveToDelivered(order.id)}
                                >
                                  Delivered
                                </Button>
                              </>
                            )}
                            {status === "delivered" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-8"
                                  onClick={() => handleOrderAgain(order)}
                                >
                                  Reorder
                                </Button>
                                <Button
                                  size="sm"
                                  className="text-xs h-8 bg-green-500 hover:bg-green-600"
                                  onClick={() => moveToFinished(order.id)}
                                >
                                  Complete
                                </Button>
                              </>
                            )}
                            {status === "finished" && (
                              <Button
                                size="sm"
                                className="text-xs h-8 bg-orange-500 hover:bg-orange-600"
                                onClick={() => handleOrderAgain(order)}
                              >
                                Order Again
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {orders.filter(o => o.status === status).length === 0 && (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-muted-foreground">No {status} orders</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Food Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <div className="relative h-48 sm:h-64">
            {selectedDish && (
              <FoodImage
                src={selectedDish.image}
                alt={selectedDish.name}
                category={selectedDish.category}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-xl sm:text-2xl font-bold">{selectedDish?.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{selectedDish?.rating}</span>
                  <span className="text-white/70 text-sm">({selectedDish?.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => selectedDish && toggleFavorite(selectedDish.id)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <Heart className={`h-5 w-5 ${selectedDish && favorites.includes(selectedDish.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>
          </div>
          
          {selectedDish && (
            <div className="p-4 sm:p-6 space-y-4">
              <p className="text-muted-foreground">{selectedDish.description}</p>
              
              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-3">
                {selectedDish.prepTime && (
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Timer className="h-5 w-5 mx-auto text-orange-500" />
                    <p className="text-xs text-muted-foreground mt-1">Prep Time</p>
                    <p className="font-medium text-sm">{selectedDish.prepTime}</p>
                  </div>
                )}
                {selectedDish.calories && (
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Flame className="h-5 w-5 mx-auto text-orange-500" />
                    <p className="text-xs text-muted-foreground mt-1">Calories</p>
                    <p className="font-medium text-sm">{selectedDish.calories}</p>
                  </div>
                )}
                {selectedDish.spicyLevel !== undefined && (
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex justify-center">{renderSpicyLevel(selectedDish.spicyLevel)}</div>
                    <p className="text-xs text-muted-foreground mt-1">Spicy Level</p>
                    <p className="font-medium text-sm">{selectedDish.spicyLevel}/5</p>
                  </div>
                )}
              </div>

              {/* Ingredients */}
              {selectedDish.ingredients && (
                <div>
                  <h4 className="font-medium mb-2">Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDish.ingredients.map((ing, idx) => (
                      <Badge key={idx} variant="secondary" className="px-3 py-1">{ing}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Section */}
              <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
                <div>
                  <span className="text-sm text-muted-foreground">Total Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-500">
                      ${selectedDish.price.toFixed(2)}
                    </span>
                    {selectedDish.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${selectedDish.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    handleOrderAgain(selectedDish)
                    setIsDetailsOpen(false)
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

