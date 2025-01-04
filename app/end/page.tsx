import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function EndPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[420px] text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Thank You for Using Restaurant Manager</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You have been successfully logged out. All your changes have been saved.
          </p>
          <div className="rounded-lg bg-muted p-8">
            <p className="text-4xl font-semibold">👋</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Have a great day!
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login">
            <Button size="lg">
              Sign Back In
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
} 