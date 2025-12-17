"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { 
  Save, 
  User, 
  Bell, 
  Package, 
  Users, 
  Globe, 
  Shield, 
  Palette,
  Mail,
  Phone,
  MapPin,
  DollarSign
} from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  
  // General Settings
  const [restaurantName, setRestaurantName] = useState("FoodHealth Restaurant")
  const [email, setEmail] = useState("contact@foodhealth.com")
  const [phone, setPhone] = useState("+1 234 567 8900")
  const [address, setAddress] = useState("123 Main St, New York, NY 10001")
  const [currency, setCurrency] = useState("USD")
  const [timezone, setTimezone] = useState("America/New_York")

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [lowStockAlerts, setLowStockAlerts] = useState(true)
  const [orderAlerts, setOrderAlerts] = useState(true)
  const [expiryAlerts, setExpiryAlerts] = useState(true)
  const [dailyReports, setDailyReports] = useState(false)

  // Inventory Settings
  const [lowStockThreshold, setLowStockThreshold] = useState([20])
  const [expiryWarningDays, setExpiryWarningDays] = useState([7])
  const [autoReorder, setAutoReorder] = useState(false)

  // Appearance Settings
  const [theme, setTheme] = useState("light")
  const [accentColor, setAccentColor] = useState("orange")

  const saveGeneralSettings = () => {
    toast({
      title: "Settings Saved!",
      description: "Your general settings have been updated successfully.",
    })
  }

  const saveNotificationSettings = () => {
    toast({
      title: "Notification Settings Updated!",
      description: "Your notification preferences have been saved.",
    })
  }

  const saveInventorySettings = () => {
    toast({
      title: "Inventory Settings Saved!",
      description: "Your inventory preferences have been updated.",
    })
  }

  const saveAppearanceSettings = () => {
    toast({
      title: "Appearance Updated!",
      description: "Your appearance preferences have been saved.",
    })
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your restaurant settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <User className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="inventory" className="gap-2">
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
              <CardDescription>Update your restaurant's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input 
                  id="restaurant-name" 
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="Enter restaurant name" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Contact Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    className="pl-8"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@restaurant.com" 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    className="pl-8"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 8900" 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="address" 
                    className="pl-8"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Restaurant address" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {currency}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setCurrency("USD")}>USD - US Dollar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrency("EUR")}>EUR - Euro</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrency("GBP")}>GBP - British Pound</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setCurrency("JPY")}>JPY - Japanese Yen</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="h-4 w-4 mr-2" />
                        {timezone}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setTimezone("America/New_York")}>America/New York</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTimezone("America/Los_Angeles")}>America/Los Angeles</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTimezone("Europe/London")}>Europe/London</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTimezone("Asia/Tokyo")}>Asia/Tokyo</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={saveGeneralSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your restaurant
                  </p>
                </div>
                <Button
                  variant={emailNotifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={emailNotifications ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {emailNotifications ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when inventory items are running low
                  </p>
                </div>
                <Button
                  variant={lowStockAlerts ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLowStockAlerts(!lowStockAlerts)}
                  className={lowStockAlerts ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {lowStockAlerts ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for new and updated orders
                  </p>
                </div>
                <Button
                  variant={orderAlerts ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOrderAlerts(!orderAlerts)}
                  className={orderAlerts ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {orderAlerts ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Expiry Date Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get warnings about items nearing expiry
                  </p>
                </div>
                <Button
                  variant={expiryAlerts ? "default" : "outline"}
                  size="sm"
                  onClick={() => setExpiryAlerts(!expiryAlerts)}
                  className={expiryAlerts ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {expiryAlerts ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive daily summary reports via email
                  </p>
                </div>
                <Button
                  variant={dailyReports ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDailyReports(!dailyReports)}
                  className={dailyReports ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {dailyReports ? "Enabled" : "Disabled"}
                </Button>
              </div>

              <Button className="bg-orange-500 hover:bg-orange-600" onClick={saveNotificationSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Configure inventory tracking and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Low Stock Threshold</Label>
                    <Badge variant="secondary">{lowStockThreshold[0]} units</Badge>
                  </div>
                  <Slider
                    value={lowStockThreshold}
                    onValueChange={setLowStockThreshold}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Alert when stock falls below this level
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Expiry Warning Period</Label>
                    <Badge variant="secondary">{expiryWarningDays[0]} days</Badge>
                  </div>
                  <Slider
                    value={expiryWarningDays}
                    onValueChange={setExpiryWarningDays}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Warn about items expiring within this period
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-0.5">
                    <Label className="text-base">Automatic Reordering</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create purchase orders when stock is low
                    </p>
                  </div>
                  <Button
                    variant={autoReorder ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoReorder(!autoReorder)}
                    className={autoReorder ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {autoReorder ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>

              <Button className="bg-orange-500 hover:bg-orange-600" onClick={saveInventorySettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => setTheme("light")}
                      className={theme === "light" ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => setTheme("dark")}
                      className={theme === "dark" ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      Dark
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["orange", "blue", "green", "purple", "red"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setAccentColor(color)}
                        className={`h-12 rounded-lg border-2 transition-all ${
                          accentColor === color ? "border-black scale-110" : "border-transparent"
                        }`}
                        style={{ 
                          backgroundColor: 
                            color === "orange" ? "#f97316" :
                            color === "blue" ? "#3b82f6" :
                            color === "green" ? "#22c55e" :
                            color === "purple" ? "#a855f7" :
                            "#ef4444"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Button className="bg-orange-500 hover:bg-orange-600" onClick={saveAppearanceSettings}>
                <Save className="h-4 w-4 mr-2" />
                Apply Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage team members and their permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {["Admin", "Manager", "Staff"].map((role) => (
                  <div key={role} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">{role}</p>
                        <p className="text-sm text-muted-foreground">
                          {role === "Admin" ? "Full access" : 
                           role === "Manager" ? "Can manage inventory and orders" :
                           "Can view and create orders"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{role === "Admin" ? "3" : role === "Manager" ? "5" : "12"} users</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Users className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
