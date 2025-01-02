export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  costPerUnit: number
  minimumStock: number
  supplier: string
  lastRestocked: string
  expiryDate?: string
}

export interface Sale {
  id: string
  customerId: string
  items: SaleItem[]
  total: number
  date: string
  paymentMethod: string
  status: 'completed' | 'refunded' | 'pending'
}

export interface SaleItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  costPrice: number
  total: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  totalPurchases: number
  totalSpent: number
  lastPurchase: string
  avatar?: string
} 