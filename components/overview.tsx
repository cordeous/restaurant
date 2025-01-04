"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Mon",
    inStock: Math.floor(Math.random() * 100) + 50,
    lowStock: Math.floor(Math.random() * 20),
    outOfStock: Math.floor(Math.random() * 10),
  },
  // ... Add similar data for other days of the week
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="inStock" name="In Stock" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="lowStock" name="Low Stock" fill="#fbbf24" radius={[4, 4, 0, 0]} />
        <Bar dataKey="outOfStock" name="Out of Stock" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

