"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Clock, TrendingUp, Users, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  name: string
  time: string
  image: string
  price: number
  rating: number
  status: "pending" | "delivered" | "finished"
}

export default function HomePage() {
  const { toast } = useToast()
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [selectedDish, setSelectedDish] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const categories = [
    {
      id: "1",
      name: "Indonesian Food",
      image: "/food/indonesian.jpg",
      href: "/inventory",
      items: 24,
      popular: true
    },
    {
      id: "2",
      name: "Japanese Food",
      image: "/food/japanese.jpg",
      href: "/inventory",
      items: 18,
      popular: true
    },
    {
      id: "3",
      name: "Korean Food",
      image: "/food/korean.jpg",
      href: "/inventory",
      items: 15,
      popular: false
    }
  ]

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      name: "Sambal Fried Fish with Fresh Vegetables",
      time: "7 Dec, 18:10",
      image: "/food/sambal-fish.jpg",
      price: 32.0,
      rating: 4.5,
      status: "pending"
    },
    {
      id: "2",
      name: "Archipelago Noodles with Chicken Katsu",
      time: "7 Dec, 18:10",
      image: "/food/noodles.jpg",
      price: 28.0,
      rating: 4.8,
      status: "pending"
    },
    {
      id: "3",
      name: "Spicy Ramen Bowl",
      time: "6 Dec, 20:15",
      image: "/food/ramen.jpg",
      price: 24.0,
      rating: 4.7,
      status: "delivered"
    }
  ])

  const quickStats = [
    {
      title: "Today's Revenue",
      value: "$1,234",
      icon: DollarSign,
      change: "+12%",
      color: "text-green-500"
    },
    {
      title: "Active Orders",
      value: "24",
      icon: ShoppingCart,
      change: "+5",
      color: "text-blue-500"
    },
    {
      title: "Total Customers",
      value: "892",
      icon: Users,
      change: "+18%",
      color: "text-purple-500"
    },
    {
      title: "Popular Items",
      value: "12",
      icon: TrendingUp,
      change: "+3",
      color: "text-orange-500"
    }
  ]

  const handleOrderAgain = (order: Order) => {
    toast({
      title: "Added to Cart!",
      description: `${order.name} has been added to your cart.`,
    })
    setCart(prev => ({
      ...prev,
      [order.id]: (prev[order.id] || 0) + 1
    }))
  }

  const handleViewDetails = (order: Order) => {
    setSelectedDish(order)
    setIsDetailsOpen(true)
  }

  const moveToDelivered = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "delivered" } : order
    ))
    toast({
      title: "Order Delivered!",
      description: "Order has been marked as delivered.",
    })
  }

  const moveToFinished = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: "finished" } : order
    ))
    toast({
      title: "Order Completed!",
      description: "Order has been marked as finished.",
    })
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col space-y-6">
        {/* Banner */}
        <Card className="bg-gradient-to-r from-orange-400 to-orange-500 border-none text-white overflow-hidden hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-2 flex-1">
              <h2 className="text-3xl font-bold">Discount New Menu!</h2>
              <p className="text-orange-100 text-lg">
                Get Free Shipping Every $20 With No Minimum Purchase
              </p>
              <Button className="mt-4 bg-white text-orange-500 hover:bg-orange-50">
                Order Now
              </Button>
            </div>
            <div className="hidden md:block">
              <Image
                src="/food/banner.png"
                alt="Food Banner"
                width={300}
                height={200}
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-all cursor-pointer hover:border-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Categories</h2>
              <p className="text-muted-foreground">Explore our food categories</p>
            </div>
            <Link href="/inventory" className="text-orange-500 hover:underline font-medium">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link href={category.href} key={category.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {category.popular && (
                      <Badge className="absolute top-2 right-2 bg-orange-500">
                        Popular
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.items} items available</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Recent Orders</h2>
              <p className="text-muted-foreground">Track and manage your orders</p>
            </div>
            <div className="flex items-center gap-2">
              {Object.keys(cart).length > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  {Object.values(cart).reduce((a, b) => a + b, 0)} items
                </Badge>
              )}
            </div>
          </div>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({orders.filter(o => o.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="delivered">
                Delivered ({orders.filter(o => o.status === "delivered").length})
              </TabsTrigger>
              <TabsTrigger value="finished">
                Finished ({orders.filter(o => o.status === "finished").length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="space-y-4 mt-4">
              {orders.filter(order => order.status === "pending").map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-all group">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={order.image}
                        alt={order.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{order.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{order.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {order.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right mr-2">
                        <span className="font-bold text-lg">${order.price.toFixed(2)}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(order)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => moveToDelivered(order.id)}
                      >
                        Mark Delivered
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {orders.filter(o => o.status === "pending").length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No pending orders</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="delivered" className="space-y-4 mt-4">
              {orders.filter(order => order.status === "delivered").map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-all group">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={order.image}
                        alt={order.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{order.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{order.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{order.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right mr-2">
                        <span className="font-bold text-lg">${order.price.toFixed(2)}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOrderAgain(order)}
                      >
                        Order Again
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => moveToFinished(order.id)}
                      >
                        Finish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {orders.filter(o => o.status === "delivered").length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No delivered orders yet
                </div>
              )}
            </TabsContent>
            <TabsContent value="finished" className="space-y-4 mt-4">
              {orders.filter(order => order.status === "finished").map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-all group opacity-75">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={order.image}
                        alt={order.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{order.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{order.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{order.time}</span>
                        <Badge variant="secondary" className="ml-2">Completed</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right mr-2">
                        <span className="font-bold text-lg">${order.price.toFixed(2)}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOrderAgain(order)}
                        className="bg-orange-500 text-white hover:bg-orange-600"
                      >
                        Order Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {orders.filter(o => o.status === "finished").length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No finished orders yet
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>View complete order information</DialogDescription>
          </DialogHeader>
          {selectedDish && (
            <div className="space-y-4">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedDish.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{selectedDish.rating}</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{selectedDish.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <span className="font-medium">Total Price</span>
                <span className="text-2xl font-bold text-orange-500">
                  ${selectedDish.price.toFixed(2)}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                handleOrderAgain(selectedDish)
                setIsDetailsOpen(false)
              }}
            >
              Order Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
