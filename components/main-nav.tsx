"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Store, 
  BarChart3, 
  Bell, 
  Boxes,
  Settings,
  Menu,
  Search,
  Utensils,
  LineChart
} from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    { href: "/", label: "Dashboard", icon: BarChart3 },
    { href: "/inventory", label: "Categories", icon: Store },
    { href: "/recipes", label: "Recipes", icon: Utensils },
    { href: "/analytics", label: "Analytics", icon: LineChart },
    { href: "/stock", label: "Orders", icon: Boxes },
    { href: "/alerts", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full p-4 bg-white">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-orange-500">FoodHealth</span>
        </Link>
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="What do you want to eat today?"
              className="pl-8 bg-muted"
            />
          </div>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden"
              size="icon"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-orange-500 text-white">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => {
                const Icon = route.icon
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium p-2 rounded-lg transition-colors",
                      pathname === route.href
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{route.label}</span>
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

