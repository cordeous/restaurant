import { BarcodeScanner } from "@/components/barcode-scanner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ScannerPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Barcode Scanner</h2>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Scan Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <BarcodeScanner />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 