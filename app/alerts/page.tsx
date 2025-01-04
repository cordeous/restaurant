import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Bell, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      title: "Low Stock Alert",
      message: "Chicken Breast is running low (5 units remaining)",
      type: "warning",
      time: "5 mins ago"
    },
    {
      title: "Order Completed",
      message: "Order #12345 has been successfully delivered",
      type: "success",
      time: "10 mins ago"
    },
    {
      title: "New Menu Item",
      message: "Spicy Ramen has been added to the menu",
      type: "info",
      time: "1 hour ago"
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-50 border-orange-100"
      case "success":
        return "bg-green-50 border-green-100"
      default:
        return "bg-blue-50 border-blue-100"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="outline">Mark all as read</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification, index) => (
            <Card 
              key={index}
              className={`hover:shadow-md transition-shadow border-l-4 ${getNotificationStyle(notification.type)}`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
} 