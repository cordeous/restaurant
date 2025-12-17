"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, AlertTriangle, CheckCircle2, Info, X, MoreVertical, Archive, Trash2, BellOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  type: "warning" | "success" | "info" | "error"
  time: string
  read: boolean
  archived: boolean
  category: string
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Low Stock Alert",
      message: "Chicken Breast is running low (5 units remaining). Consider reordering soon.",
      type: "warning",
      time: "5 mins ago",
      read: false,
      archived: false,
      category: "inventory"
    },
    {
      id: "2",
      title: "Order Completed",
      message: "Order #12345 has been successfully delivered to the customer.",
      type: "success",
      time: "10 mins ago",
      read: false,
      archived: false,
      category: "orders"
    },
    {
      id: "3",
      title: "New Menu Item",
      message: "Spicy Ramen has been added to the menu and is now available for customers.",
      type: "info",
      time: "1 hour ago",
      read: true,
      archived: false,
      category: "menu"
    },
    {
      id: "4",
      title: "Expiring Soon",
      message: "Fresh vegetables batch #234 will expire in 2 days. Plan usage accordingly.",
      type: "warning",
      time: "2 hours ago",
      read: false,
      archived: false,
      category: "inventory"
    },
    {
      id: "5",
      title: "Payment Received",
      message: "Payment of $1,234.50 has been successfully processed.",
      type: "success",
      time: "3 hours ago",
      read: true,
      archived: false,
      category: "payments"
    },
    {
      id: "6",
      title: "System Update",
      message: "New features have been added to the analytics dashboard.",
      type: "info",
      time: "5 hours ago",
      read: true,
      archived: false,
      category: "system"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "error":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-50 border-orange-200"
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = 
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch && !notif.archived
  })

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
    toast({
      title: "Marked as read",
      description: "Notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast({
      title: "All marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const archiveNotification = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, archived: true } : n
    ))
    toast({
      title: "Archived",
      description: "Notification has been archived.",
    })
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
    toast({
      title: "Deleted",
      description: "Notification has been deleted.",
      variant: "destructive",
    })
  }

  const viewDetails = (notif: Notification) => {
    setSelectedNotification(notif)
    setIsDetailsOpen(true)
    if (!notif.read) {
      markAsRead(notif.id)
    }
  }

  const getFilteredByTab = (tab: string) => {
    let filtered = filteredNotifications
    
    if (tab === "unread") {
      filtered = filtered.filter(n => !n.read)
    } else if (tab === "alerts") {
      filtered = filtered.filter(n => n.type === "warning" || n.type === "error")
    } else if (tab === "updates") {
      filtered = filtered.filter(n => n.type === "info" || n.type === "success")
    }
    
    return filtered
  }

  const stats = {
    all: filteredNotifications.length,
    unread: filteredNotifications.filter(n => !n.read).length,
    alerts: filteredNotifications.filter(n => n.type === "warning" || n.type === "error").length,
    updates: filteredNotifications.filter(n => n.type === "info" || n.type === "success").length,
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Stay updated with alerts and notifications
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {unreadCount > 0 && (
            <>
              <Badge variant="secondary" className="px-3 py-1">
                {unreadCount} unread
              </Badge>
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All ({stats.all})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({stats.unread})
          </TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts ({stats.alerts})
          </TabsTrigger>
          <TabsTrigger value="updates">
            Updates ({stats.updates})
          </TabsTrigger>
        </TabsList>

        {["all", "unread", "alerts", "updates"].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {getFilteredByTab(tab).map((notification) => (
              <Card 
                key={notification.id}
                className={`hover:shadow-md transition-all border-l-4 cursor-pointer ${
                  getNotificationStyle(notification.type)
                } ${notification.read ? 'opacity-60' : ''}`}
                onClick={() => viewDetails(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{notification.title}</h3>
                            {!notification.read && (
                              <Badge variant="secondary" className="bg-orange-500 text-white text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Badge variant="outline" className="text-xs">
                              {notification.category}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!notification.read && (
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark as read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation()
                              archiveNotification(notification.id)
                            }}>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {getFilteredByTab(tab).length === 0 && (
              <div className="text-center py-12">
                <BellOff className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications found</p>
                {searchTerm && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Notification Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNotification && getNotificationIcon(selectedNotification.type)}
              {selectedNotification?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedNotification?.time} • {selectedNotification?.category}
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${getNotificationStyle(selectedNotification.type)}`}>
                <p className="text-sm">{selectedNotification.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={
                  selectedNotification.type === "warning" ? "bg-orange-100" :
                  selectedNotification.type === "success" ? "bg-green-100" :
                  selectedNotification.type === "error" ? "bg-red-100" :
                  "bg-blue-100"
                }>
                  {selectedNotification.type.toUpperCase()}
                </Badge>
                {selectedNotification.read ? (
                  <Badge variant="outline">Read</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-orange-500 text-white">
                    Unread
                  </Badge>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            {selectedNotification && (
              <Button 
                onClick={() => {
                  archiveNotification(selectedNotification.id)
                  setIsDetailsOpen(false)
                }}
              >
                Archive
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
