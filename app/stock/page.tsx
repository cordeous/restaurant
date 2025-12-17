"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Search, Filter, Plus, MoreVertical, CheckCircle, XCircle, Clock, Package, Truck, User } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface OrderItem {
  id: string
  name: string
  image: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderId: string
  customer: string
  customerAvatar?: string
  items: OrderItem[]
  total: number
  status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled"
  time: string
  paymentMethod: string
  address?: string
  phone?: string
}

export default function OrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderId: "#12345",
      customer: "John Doe",
      customerAvatar: "/avatars/user1.jpg",
      items: [
        {
          id: "1",
          name: "Spicy Ramen",
          image: "/food/ramen.jpg",
          quantity: 2,
          price: 15.99
        },
        {
          id: "2",
          name: "Chicken Katsu",
          image: "/food/katsu.jpg",
          quantity: 1,
          price: 18.99
        }
      ],
      total: 50.97,
      status: "Preparing",
      time: "10 mins ago",
      paymentMethod: "Credit Card",
      phone: "+1 234 567 8900",
      address: "123 Main St, New York, NY 10001"
    },
    {
      id: "2",
      orderId: "#12346",
      customer: "Jane Smith",
      items: [
        {
          id: "3",
          name: "Caesar Salad",
          image: "/food/appetizers.jpg",
          quantity: 1,
          price: 12.99
        }
      ],
      total: 12.99,
      status: "Pending",
      time: "5 mins ago",
      paymentMethod: "Cash",
      phone: "+1 234 567 8901",
      address: "456 Oak Ave, Brooklyn, NY 11201"
    },
    {
      id: "3",
      orderId: "#12347",
      customer: "Bob Johnson",
      items: [
        {
          id: "4",
          name: "Spicy Ramen",
          image: "/food/ramen.jpg",
          quantity: 3,
          price: 15.99
        }
      ],
      total: 47.97,
      status: "Ready",
      time: "15 mins ago",
      paymentMethod: "Credit Card",
      phone: "+1 234 567 8902",
      address: "789 Pine Rd, Queens, NY 11354"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Filter orders by search and tab
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = 
      activeTab === "all" || 
      order.status.toLowerCase() === activeTab.toLowerCase()
    
    return matchesSearch && matchesTab
  })

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    
    toast({
      title: "Status Updated",
      description: `Order ${orders.find(o => o.id === orderId)?.orderId} is now ${newStatus}`,
    })
  }

  const cancelOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: "Cancelled" } : order
    ))
    
    toast({
      title: "Order Cancelled",
      description: `Order ${orders.find(o => o.id === orderId)?.orderId} has been cancelled`,
      variant: "destructive",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600"
      case "Preparing":
        return "bg-blue-100 text-blue-600"
      case "Ready":
        return "bg-green-100 text-green-600"
      case "Delivered":
        return "bg-gray-100 text-gray-600"
      case "Cancelled":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Preparing":
        return <Package className="h-4 w-4" />
      case "Ready":
        return <CheckCircle className="h-4 w-4" />
      case "Delivered":
        return <Truck className="h-4 w-4" />
      case "Cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const orderStats = {
    all: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    preparing: orders.filter(o => o.status === "Preparing").length,
    ready: orders.filter(o => o.status === "Ready").length,
    delivered: orders.filter(o => o.status === "Delivered").length,
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Add a new order to the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input id="customer" placeholder="Enter customer name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 234 567 8900" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input id="address" placeholder="Street address" />
                </div>
                <div className="grid gap-2">
                  <Label>Payment Method</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        Select payment method
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem>Credit Card</DropdownMenuItem>
                      <DropdownMenuItem>Cash</DropdownMenuItem>
                      <DropdownMenuItem>Digital Wallet</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Create Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("all")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">All Orders</p>
                <p className="text-2xl font-bold">{orderStats.all}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("pending")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{orderStats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("preparing")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preparing</p>
                <p className="text-2xl font-bold">{orderStats.preparing}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("ready")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold">{orderStats.ready}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("delivered")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold">{orderStats.delivered}</p>
              </div>
              <Truck className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{order.orderId}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{order.customer}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{order.time}</span>
                        <span>•</span>
                        <span>{order.paymentMethod}</span>
                        {order.phone && (
                          <>
                            <span>•</span>
                            <span>{order.phone}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                            <div className="relative h-12 w-12 rounded overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                x{item.quantity} • ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.address && (
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Address:</span> {order.address}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-orange-500">${order.total.toFixed(2)}</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => {
                          setSelectedOrder(order);
                          setIsViewDialogOpen(true);
                        }}>
                          View Details
                        </DropdownMenuItem>
                        {order.status === "Pending" && (
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Preparing")}>
                            Start Preparing
                          </DropdownMenuItem>
                        )}
                        {order.status === "Preparing" && (
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Ready")}>
                            Mark as Ready
                          </DropdownMenuItem>
                        )}
                        {order.status === "Ready" && (
                          <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "Delivered")}>
                            Mark as Delivered
                          </DropdownMenuItem>
                        )}
                        {order.status !== "Cancelled" && order.status !== "Delivered" && (
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => cancelOrder(order.id)}
                          >
                            Cancel Order
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No orders found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Tabs>

      {/* View Order Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details {selectedOrder?.orderId}</DialogTitle>
            <DialogDescription>
              Complete order information
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Customer</Label>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedOrder.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Payment</Label>
                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                </div>
              </div>
              
              {selectedOrder.address && (
                <div>
                  <Label className="text-muted-foreground">Delivery Address</Label>
                  <p className="font-medium">{selectedOrder.address}</p>
                </div>
              )}

              <div>
                <Label className="text-muted-foreground mb-2 block">Order Items</Label>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
