import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const categories = [
    {
      name: "Indonesian Food",
      image: "/food/indonesian.jpg",
      href: "/category/indonesian"
    },
    {
      name: "Japanese Food",
      image: "/food/japanese.jpg",
      href: "/category/japanese"
    },
    {
      name: "Korean Food",
      image: "/food/korean.jpg",
      href: "/category/korean"
    }
  ]

  const recentOrders = [
    {
      name: "Sambal Fried Fish with Fresh Vegetables",
      time: "7 Dec, 18:10",
      image: "/food/sambal-fish.jpg",
      price: "$320"
    },
    {
      name: "Archipelago Noodles with Chicken Katsu",
      time: "7 Dec, 18:10",
      image: "/food/noodles.jpg",
      price: "$320"
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col space-y-6">
        {/* Banner */}
        <Card className="bg-gradient-to-r from-orange-400 to-orange-500 border-none text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Discount New Menu!</h2>
              <p className="text-orange-100">
                Get Free Shipping Every $20 With No Minimum Purchase
              </p>
            </div>
            <Image
              src="/food/banner.png"
              alt="Food Banner"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Link href="/categories" className="text-orange-500 hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link href={category.href} key={category.name}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
          </div>
          <Tabs defaultValue="order">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="order">Order</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="finished">Finished</TabsTrigger>
            </TabsList>
            <TabsContent value="order" className="space-y-4 mt-4">
              {recentOrders.map((order) => (
                <Card key={order.name}>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                      <Image
                        src={order.image}
                        alt={order.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{order.name}</h3>
                      <p className="text-sm text-muted-foreground">{order.time}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{order.price}</span>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        Order Again
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="delivered">
              <div className="text-center py-10 text-muted-foreground">
                No delivered orders yet
              </div>
            </TabsContent>
            <TabsContent value="finished">
              <div className="text-center py-10 text-muted-foreground">
                No finished orders yet
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

