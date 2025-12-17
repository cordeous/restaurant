"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChefHat, 
  ArrowRight, 
  Store, 
  Utensils, 
  LineChart, 
  Boxes, 
  Bell, 
  Settings,
  Star,
  Check,
  Sparkles,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  ChevronRight,
  Play,
  Moon,
  Sun
} from "lucide-react"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Store,
      title: "Inventory Management",
      description: "Track your ingredients, supplies, and stock levels in real-time with smart alerts.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Utensils,
      title: "Recipe Builder",
      description: "Create, organize, and cost your recipes with automatic ingredient calculations.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: LineChart,
      title: "Analytics Dashboard",
      description: "Get insights into sales, popular items, and trends to make data-driven decisions.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Boxes,
      title: "Order Management",
      description: "Handle orders efficiently from placement to delivery with status tracking.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Never run out of stock with intelligent notifications and reorder reminders.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Settings,
      title: "Customizable Settings",
      description: "Configure the system to match your restaurant's unique workflow and needs.",
      color: "from-slate-500 to-gray-600"
    }
  ]

  const stats = [
    { value: "10K+", label: "Active Users", icon: Users },
    { value: "50M+", label: "Orders Managed", icon: TrendingUp },
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "< 1s", label: "Response Time", icon: Zap }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Owner, Fusion Kitchen",
      content: "FoodHealth transformed how we manage our restaurant. Inventory tracking alone saves us 10 hours per week!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Head Chef, La Mesa",
      content: "The recipe builder is a game-changer. I can cost dishes instantly and adjust portions with ease.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Manager, The Garden Café",
      content: "Best investment we made. The analytics helped us identify our most profitable items.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                FoodHealth
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Features</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {mounted && (
                  resolvedTheme === "dark" ? (
                    <Sun className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600" />
                  )
                )}
              </button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300/20 dark:bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-200/30 to-yellow-200/30 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-0 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              #1 Restaurant Management Platform
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gray-900 dark:text-white">Manage Your</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent">
                Restaurant Smarter
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The all-in-one platform to manage inventory, track orders, build recipes, and grow your restaurant business with powerful analytics.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg border-2 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-950 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative mx-auto max-w-5xl">
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-2xl shadow-gray-900/10 dark:shadow-black/30 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-1 bg-gray-100 dark:bg-gray-700 flex items-center gap-2">
                  <div className="flex gap-1.5 ml-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">FoodHealth Dashboard</div>
                </div>
                <div className="aspect-[16/9] bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
                  {/* Mock Dashboard Preview */}
                  <div className="absolute inset-4 grid grid-cols-4 gap-4">
                    <div className="col-span-3 space-y-4">
                      <div className="h-16 bg-white dark:bg-gray-700 rounded-xl shadow-sm animate-pulse" />
                      <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-24 bg-white dark:bg-gray-700 rounded-xl shadow-sm" />
                        ))}
                      </div>
                      <div className="h-48 bg-white dark:bg-gray-700 rounded-xl shadow-sm" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-32 bg-white dark:bg-gray-700 rounded-xl shadow-sm" />
                      <div className="h-32 bg-white dark:bg-gray-700 rounded-xl shadow-sm" />
                      <div className="h-32 bg-white dark:bg-gray-700 rounded-xl shadow-sm" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/20">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-xl mb-4">
                        <ChefHat className="h-10 w-10 text-white" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">Interactive Dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/20 mb-4">
                    <Icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-0">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Everything you need to run your restaurant
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Powerful tools designed specifically for restaurant management, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group relative p-6 lg:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <ChevronRight className="absolute top-6 right-6 h-5 w-5 text-gray-300 dark:text-gray-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-0">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Loved by restaurant owners
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              See what our customers have to say about FoodHealth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 lg:p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-0">
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Start free, upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Starter</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Perfect for small restaurants</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$0</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {["Up to 50 menu items", "Basic inventory tracking", "Order management", "Email support"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="block mt-8">
                <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-xl shadow-orange-500/30 scale-105">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-orange-600 shadow-lg">
                Most Popular
              </Badge>
              <h3 className="text-lg font-semibold text-white">Professional</h3>
              <p className="text-sm text-orange-100 mt-1">For growing restaurants</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-orange-100">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {["Unlimited menu items", "Advanced analytics", "Recipe costing", "Multi-location support", "Priority support"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <Check className="h-5 w-5 text-orange-200 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="block mt-8">
                <Button className="w-full bg-white text-orange-600 hover:bg-orange-50">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enterprise</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For restaurant chains</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
              </div>
              <ul className="mt-6 space-y-3">
                {["Everything in Pro", "Custom integrations", "Dedicated account manager", "SLA guarantee", "On-premise option"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-8 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to transform your restaurant?
              </h2>
              <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Join thousands of restaurant owners who are already saving time and growing their business with FoodHealth.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="px-8 py-6 text-lg bg-white text-orange-600 hover:bg-orange-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                FoodHealth
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} FoodHealth. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">Terms</a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
