"use client"

import { useEffect, useRef, useState } from 'react'
import Quagga from 'quagga'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export function BarcodeScanner() {
  const [scanning, setScanning] = useState(false)
  const scannerRef = useRef<HTMLDivElement>(null)

  const startScanner = () => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerRef.current,
        constraints: {
          facingMode: "environment"
        },
      },
      decoder: {
        readers: ["ean_reader", "ean_8_reader", "code_128_reader", "code_39_reader"]
      }
    }, (err: Error | null) => {
      if (err) {
        console.error(err)
        return
      }
      Quagga.start()
      setScanning(true)
    })

    Quagga.onDetected((result: { codeResult: { code: string } }) => {
      if (result.codeResult.code) {
        toast({
          title: "Barcode Detected",
          description: `Code: ${result.codeResult.code}`,
        })
        // Here you would typically look up the product in your database
      }
    })
  }

  const stopScanner = () => {
    Quagga.stop()
    setScanning(false)
  }

  useEffect(() => {
    return () => {
      if (scanning) {
        Quagga.stop()
      }
    }
  }, [scanning])

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Barcode Scanner</h3>
          <Button
            onClick={scanning ? stopScanner : startScanner}
            variant={scanning ? "destructive" : "default"}
          >
            {scanning ? "Stop Scanner" : "Start Scanner"}
          </Button>
        </div>
        <div 
          ref={scannerRef} 
          className="relative h-64 bg-black rounded-lg overflow-hidden"
        />
      </div>
    </Card>
  )
} 