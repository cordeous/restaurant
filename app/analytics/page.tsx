"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Clock, Download, Filter, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const salesData = {
    "6months": [
      { month: "Jan", sales: 4000, profit: 2400, orders: 240, customers: 180 },
      { month: "Feb", sales: 3000, profit: 1398, orders: 198, customers: 150 },
      { month: "Mar", sales: 2000, profit: 9800, orders: 350, customers: 280 },
      { month: "Apr", sales: 2780, profit: 3908, orders: 280, customers: 220 },
      { month: "May", sales: 1890, profit: 4800, orders: 320, customers: 250 },
      { month: "Jun", sales: 2390, profit: 3800, orders: 290, customers: 230 },
    ],
    "1year": [
      { month: "Jan", sales: 4000, profit: 2400, orders: 240, customers: 180 },
      { month: "Feb", sales: 3000, profit: 1398, orders: 198, customers: 150 },
      { month: "Mar", sales: 2000, profit: 9800, orders: 350, customers: 280 },
      { month: "Apr", sales: 2780, profit: 3908, orders: 280, customers: 220 },
      { month: "May", sales: 1890, profit: 4800, orders: 320, customers: 250 },
      { month: "Jun", sales: 2390, profit: 3800, orders: 290, customers: 230 },
      { month: "Jul", sales: 3490, profit: 4300, orders: 310, customers: 240 },
      { month: "Aug", sales: 4000, profit: 2400, orders: 340, customers: 260 },
      { month: "Sep", sales: 3500, profit: 3100, orders: 300, customers: 235 },
      { month: "Oct", sales: 3800, profit: 3500, orders: 330, customers: 255 },
      { month: "Nov", sales: 4200, profit: 3900, orders: 360, customers: 275 },
      { month: "Dec", sales: 4500, profit: 4200, orders: 380, customers: 290 },
    ]
  }

  const categoryData = [
    { name: "Main Dishes", value: 400, color: "#f97316" },
    { name: "Appetizers", value: 300, color: "#fb923c" },
    { name: "Desserts", value: 200, color: "#fdba74" },
    { name: "Beverages", value: 278, color: "#fed7aa" },
  ]

  const topSellingItems = [
    { name: "Spicy Ramen", sales: 234, revenue: 3738.66, trend: "+12%" },
    { name: "Chicken Katsu", sales: 187, revenue: 3551.13, trend: "+8%" },
    { name: "Caesar Salad", sales: 156, revenue: 2026.44, trend: "+5%" },
    { name: "Fried Rice", sales: 143, revenue: 1858.90, trend: "-2%" },
    { name: "Pad Thai", sales: 128, revenue: 1766.72, trend: "+15%" },
  ]

  const revenueByHour = [
    { hour: "9 AM", revenue: 450 },
    { hour: "10 AM", revenue: 680 },
    { hour: "11 AM", revenue: 920 },
    { hour: "12 PM", revenue: 1450 },
    { hour: "1 PM", revenue: 1680 },
    { hour: "2 PM", revenue: 980 },
    { hour: "3 PM", revenue: 620 },
    { hour: "4 PM", revenue: 540 },
    { hour: "5 PM", revenue: 780 },
    { hour: "6 PM", revenue: 1520 },
    { hour: "7 PM", revenue: 1890 },
    { hour: "8 PM", revenue: 1650 },
  ]

  const currentData = salesData[timeRange as keyof typeof salesData]

  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      description: "From last period"
    },
    {
      title: "Orders",
      value: "2,345",
      change: "+15.1%",
      trend: "up",
      icon: ShoppingBag,
      description: "From last period"
    },
    {
      title: "Customers",
      value: "1,234",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      description: "From last period"
    },
    {
      title: "Avg. Order Time",
      value: "12min",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      description: "Improvement"
    },
  ]

  const exportData = () => {
    // Simple CSV export simulation
    const csvContent = currentData.map(row => 
      `${row.month},${row.sales},${row.profit}`
    ).join('\n')
    
    const blob = new Blob([`Month,Sales,Profit\n${csvContent}`], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${timeRange}.csv`
    a.click()
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Track your restaurant performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                {timeRange === "6months" ? "Last 6 Months" : "Last Year"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeRange("6months")}>
                Last 6 Months
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("1year")}>
                Last Year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card 
              key={metric.title} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-orange-500"
              onClick={() => {
                // Toggle metric selection for visualization
                if (metric.title === "Total Revenue") setSelectedMetric("revenue")
                else if (metric.title === "Orders") setSelectedMetric("orders")
                else if (metric.title === "Customers") setSelectedMetric("customers")
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs mt-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {metric.change}
                  </span>
                  <span className="text-muted-foreground ml-1">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Revenue Overview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Sales</Badge>
                    <Badge variant="secondary" className="bg-green-100">Profit</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={currentData}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                      cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="sales" 
                      fill="#f97316" 
                      name="Sales" 
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      dataKey="profit" 
                      fill="#22c55e" 
                      name="Profit" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellingItems.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.sales} orders</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold">${item.revenue.toFixed(2)}</p>
                        <Badge 
                          variant="secondary" 
                          className={item.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                        >
                          {item.trend}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={currentData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#f97316" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topSellingItems} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#f97316" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={currentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    dot={{ fill: '#f97316', r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Hour</CardTitle>
              <p className="text-sm text-muted-foreground">Peak hours analysis</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueByHour}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="revenue" 
                    fill="#f97316"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-900">Peak Hours</p>
                <p className="text-sm text-orange-700 mt-1">
                  Highest revenue between 12 PM - 2 PM and 6 PM - 8 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
