"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FoodImageProps {
  src?: string
  alt: string
  category?: "main" | "appetizer" | "dessert" | "beverage" | "ramen" | "katsu" | "salad" | "noodles" | "default"
  className?: string
  fill?: boolean
  width?: number
  height?: number
}

// SVG-based food illustrations for different categories
const foodIllustrations: Record<string, JSX.Element> = {
  main: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="plate-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f4" />
          <stop offset="100%" stopColor="#e7e5e4" />
        </linearGradient>
        <linearGradient id="food-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="140" rx="80" ry="20" fill="#d1d5db" opacity="0.3" />
      <ellipse cx="100" cy="120" rx="70" ry="40" fill="url(#plate-gradient)" />
      <ellipse cx="100" cy="115" rx="60" ry="32" fill="#fafaf9" />
      <ellipse cx="100" cy="105" rx="45" ry="22" fill="url(#food-gradient)" />
      <ellipse cx="85" cy="100" rx="12" ry="8" fill="#22c55e" opacity="0.9" />
      <ellipse cx="115" cy="100" rx="12" ry="8" fill="#22c55e" opacity="0.9" />
      <circle cx="100" cy="85" r="15" fill="#fbbf24" opacity="0.8" />
      <path d="M60 60 Q100 40 140 60" stroke="#78716c" strokeWidth="3" fill="none" />
    </svg>
  ),
  appetizer: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="bowl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="150" rx="60" ry="15" fill="#d1d5db" opacity="0.3" />
      <path d="M40 100 Q40 150 100 150 Q160 150 160 100 Q160 80 100 80 Q40 80 40 100" fill="url(#bowl-grad)" />
      <ellipse cx="100" cy="85" rx="55" ry="15" fill="#fef9c3" />
      <circle cx="80" cy="90" r="8" fill="#22c55e" />
      <circle cx="100" cy="85" r="10" fill="#ef4444" />
      <circle cx="120" cy="92" r="7" fill="#f97316" />
      <circle cx="90" cy="100" r="6" fill="#eab308" />
      <circle cx="110" cy="95" r="5" fill="#84cc16" />
    </svg>
  ),
  dessert: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="cake-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>
        <linearGradient id="frosting" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fef2f2" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="160" rx="50" ry="12" fill="#d1d5db" opacity="0.3" />
      <rect x="50" y="100" width="100" height="50" rx="5" fill="url(#cake-grad)" />
      <path d="M50 100 Q75 80 100 90 Q125 80 150 100" fill="url(#frosting)" />
      <circle cx="70" cy="95" r="5" fill="#ef4444" />
      <circle cx="100" cy="90" r="6" fill="#ef4444" />
      <circle cx="130" cy="95" r="5" fill="#ef4444" />
      <rect x="97" y="60" width="6" height="30" fill="#fbbf24" />
      <ellipse cx="100" cy="55" rx="8" ry="12" fill="#f97316" />
      <ellipse cx="100" cy="50" rx="4" ry="6" fill="#fbbf24" />
    </svg>
  ),
  beverage: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="50%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="drink-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="165" rx="35" ry="8" fill="#d1d5db" opacity="0.3" />
      <path d="M65 50 L70 155 Q70 160 100 160 Q130 160 130 155 L135 50 Z" fill="url(#glass-grad)" opacity="0.7" />
      <path d="M70 70 L73 150 Q73 155 100 155 Q127 155 127 150 L130 70 Z" fill="url(#drink-grad)" />
      <ellipse cx="100" cy="70" rx="30" ry="8" fill="#fdba74" />
      <rect x="125" y="40" width="8" height="60" rx="4" fill="#84cc16" transform="rotate(15 129 70)" />
      <circle cx="80" cy="100" r="5" fill="#fff" opacity="0.5" />
      <circle cx="90" cy="120" r="4" fill="#fff" opacity="0.4" />
    </svg>
  ),
  ramen: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="broth-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="155" rx="70" ry="18" fill="#d1d5db" opacity="0.3" />
      <path d="M30 100 Q30 150 100 150 Q170 150 170 100 Q170 70 100 70 Q30 70 30 100" fill="#1e293b" />
      <ellipse cx="100" cy="75" rx="65" ry="20" fill="#0f172a" />
      <ellipse cx="100" cy="90" rx="55" ry="35" fill="url(#broth-grad)" />
      <ellipse cx="70" cy="85" rx="15" ry="10" fill="#fff" opacity="0.9" />
      <circle cx="68" cy="82" r="4" fill="#1e293b" />
      <path d="M50 100 Q70 110 90 100 Q110 90 130 100" stroke="#f5f5f4" strokeWidth="4" fill="none" />
      <path d="M55 110 Q75 120 95 110 Q115 100 135 110" stroke="#f5f5f4" strokeWidth="4" fill="none" />
      <rect x="120" y="70" width="25" height="15" rx="2" fill="#7c2d12" />
      <ellipse cx="85" cy="100" rx="8" ry="5" fill="#22c55e" />
    </svg>
  ),
  katsu: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="rice-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#f5f5f4" />
        </linearGradient>
        <linearGradient id="katsu-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="150" rx="75" ry="20" fill="#d1d5db" opacity="0.3" />
      <ellipse cx="100" cy="130" rx="70" ry="35" fill="#f5f5f4" />
      <ellipse cx="100" cy="125" rx="65" ry="30" fill="#fafaf9" />
      <ellipse cx="65" cy="115" rx="30" ry="18" fill="url(#rice-grad)" />
      <rect x="90" y="105" width="50" height="25" rx="5" fill="url(#katsu-grad)" />
      <line x1="95" y1="110" x2="95" y2="125" stroke="#b45309" strokeWidth="2" />
      <line x1="105" y1="110" x2="105" y2="125" stroke="#b45309" strokeWidth="2" />
      <line x1="115" y1="110" x2="115" y2="125" stroke="#b45309" strokeWidth="2" />
      <line x1="125" y1="110" x2="125" y2="125" stroke="#b45309" strokeWidth="2" />
      <ellipse cx="130" cy="130" rx="12" ry="8" fill="#22c55e" />
    </svg>
  ),
  salad: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="salad-bowl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="155" rx="65" ry="18" fill="#d1d5db" opacity="0.3" />
      <path d="M35 100 Q35 145 100 145 Q165 145 165 100 Q165 75 100 75 Q35 75 35 100" fill="url(#salad-bowl)" />
      <ellipse cx="100" cy="80" rx="60" ry="18" fill="#fef9c3" />
      <ellipse cx="75" cy="90" rx="20" ry="12" fill="#22c55e" />
      <ellipse cx="120" cy="85" rx="18" ry="10" fill="#86efac" />
      <ellipse cx="95" cy="100" rx="15" ry="8" fill="#4ade80" />
      <circle cx="110" cy="95" r="8" fill="#ef4444" />
      <circle cx="80" cy="80" r="6" fill="#fbbf24" />
      <circle cx="130" cy="100" r="5" fill="#f97316" />
      <ellipse cx="60" cy="95" rx="8" ry="5" fill="#a3e635" />
    </svg>
  ),
  noodles: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="noodle-plate" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f4" />
          <stop offset="100%" stopColor="#e7e5e4" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="145" rx="70" ry="18" fill="#d1d5db" opacity="0.3" />
      <ellipse cx="100" cy="125" rx="65" ry="35" fill="url(#noodle-plate)" />
      <ellipse cx="100" cy="120" rx="55" ry="28" fill="#fafaf9" />
      <path d="M50 105 Q70 120 90 105 Q110 90 130 105 Q150 120 150 105" stroke="#fbbf24" strokeWidth="5" fill="none" />
      <path d="M55 115 Q75 130 95 115 Q115 100 135 115 Q155 130 145 115" stroke="#f59e0b" strokeWidth="5" fill="none" />
      <path d="M60 125 Q80 140 100 125 Q120 110 140 125" stroke="#fbbf24" strokeWidth="5" fill="none" />
      <rect x="110" y="85" width="30" height="18" rx="3" fill="#7c2d12" />
      <ellipse cx="70" cy="100" rx="10" ry="6" fill="#22c55e" />
      <circle cx="90" cy="95" r="5" fill="#ef4444" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="default-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="150" rx="60" ry="15" fill="#d1d5db" opacity="0.3" />
      <circle cx="100" cy="100" r="55" fill="url(#default-grad)" />
      <circle cx="100" cy="100" r="45" fill="#fff7ed" />
      <text x="100" y="95" textAnchor="middle" fontSize="24" fill="#f97316">🍽️</text>
      <text x="100" y="120" textAnchor="middle" fontSize="10" fill="#9a3412" fontWeight="500">FOOD</text>
    </svg>
  ),
}

export function FoodImage({ src, alt, category = "default", className, fill = true, width, height }: FoodImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const showPlaceholder = !src || imageError

  if (showPlaceholder) {
    return (
      <div className={cn(
        "relative bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center overflow-hidden",
        fill && "absolute inset-0",
        className
      )} style={!fill ? { width, height } : undefined}>
        <div className="w-3/4 h-3/4 animate-fade-in">
          {foodIllustrations[category] || foodIllustrations.default}
        </div>
        <div className="absolute inset-0 shimmer pointer-events-none" />
      </div>
    )
  }

  return (
    <div className={cn(
      "relative overflow-hidden",
      fill && "absolute inset-0",
      className
    )}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          "object-cover transition-all duration-500",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => setImageError(true)}
      />
    </div>
  )
}

// Export individual illustrations for direct use
export { foodIllustrations }

