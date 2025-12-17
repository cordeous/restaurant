"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { 
  Store, 
  Bell, 
  Boxes,
  Settings,
  Menu,
  Search,
  Utensils,
  LineChart,
  Home,
  X,
  ChefHat,
  User,
  Sun,
  Moon
} from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/inventory", label: "Categories", icon: Store },
    { href: "/recipes", label: "Recipes", icon: Utensils },
    { href: "/analytics", label: "Analytics", icon: LineChart },
    { href: "/stock", label: "Orders", icon: Boxes },
    { href: "/alerts", label: "Alerts", icon: Bell, badge: 3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Main Header */}
      <div className="flex justify-between items-center w-full px-4 py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-105">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hidden sm:block">
            FoodHealth
          </span>
        </Link>

        {/* Search Bar - Hidden on very small screens */}
        <div className={cn(
          "hidden sm:flex flex-1 max-w-xl mx-4 md:mx-8 transition-all duration-300",
          searchFocused && "max-w-2xl"
        )}>
          <div className={cn(
            "relative w-full transition-all duration-300",
            searchFocused && "transform scale-105"
          )}>
            <Search className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300",
              searchFocused ? "text-orange-500" : "text-muted-foreground"
            )} />
            <Input
              placeholder="What do you want to eat today?"
              className={cn(
                "pl-10 pr-4 py-5 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm transition-all duration-300",
                searchFocused && "bg-white dark:bg-gray-700 shadow-lg ring-2 ring-orange-500/20 border-orange-300 dark:border-orange-500/50"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Desktop Navigation Icons */}
        <div className="hidden lg:flex items-center gap-1">
          {routes.slice(0, 5).map((route) => {
            const Icon = route.icon
            const isActive = pathname === route.href
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                <div className="relative">
                  <Icon className={cn(
                    "h-5 w-5 transition-transform duration-300",
                    isActive && "scale-110",
                    !isActive && "group-hover:scale-110"
                  )} />
                  {route.badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 animate-pulse">
                      {route.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] font-medium">{route.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {mounted && (
              resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-300 hover:-rotate-12" />
              )
            )}
          </button>

          {/* Notification Bell - Desktop */}
          <Link 
            href="/alerts" 
            className="hidden md:flex lg:hidden relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500">
              3
            </Badge>
          </Link>

          {/* Settings - Desktop */}
          <Link 
            href="/settings" 
            className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>

          {/* User Avatar */}
          <button className="hidden md:flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </button>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden rounded-xl"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="lg:hidden rounded-xl"
                size="icon"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0 bg-white dark:bg-gray-900 border-l-0 dark:border-l dark:border-gray-800">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <ChefHat className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg dark:text-white">FoodHealth</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Search */}
                <div className="p-4 border-b dark:border-gray-800">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                  {routes.map((route) => {
                    const Icon = route.icon
                    const isActive = pathname === route.href
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{route.label}</span>
                        {route.badge && (
                          <Badge className={cn(
                            "ml-auto",
                            isActive ? "bg-white/20 text-white" : "bg-red-500 text-white"
                          )}>
                            {route.badge}
                          </Badge>
                        )}
                      </Link>
                    )
                  })}

                  {/* Theme Toggle in Mobile Menu */}
                  <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                  >
                    {mounted && (
                      resolvedTheme === "dark" ? (
                        <>
                          <Sun className="h-5 w-5 text-amber-500" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="h-5 w-5" />
                          <span>Dark Mode</span>
                        </>
                      )
                    )}
                  </button>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-4 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm dark:text-white">Admin User</p>
                      <p className="text-xs text-muted-foreground">admin@foodhealth.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Secondary Navigation Bar - Tablet */}
      <div className="hidden md:flex lg:hidden items-center justify-center gap-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
        {routes.slice(0, 5).map((route) => {
          const Icon = route.icon
          const isActive = pathname === route.href
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                isActive 
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" 
                  : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{route.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
