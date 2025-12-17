import './globals.css'
import { Poppins } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata = {
  title: 'FoodHealth - Restaurant Manager',
  description: 'Manage your restaurant inventory and create dynamic menus',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
            <MainNav />
          </header>
          <main className="flex-1 overflow-x-hidden px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 safe-bottom">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
