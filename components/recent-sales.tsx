import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Stock Update</p>
          <p className="text-sm text-muted-foreground">
            Tomatoes - Added 50 units
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Received</Badge>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Low Stock Alert</p>
          <p className="text-sm text-muted-foreground">
            Chicken Breast - 5 units remaining
          </p>
        </div>
        <Badge className="ml-auto" variant="destructive">Alert</Badge>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Inventory Count</p>
          <p className="text-sm text-muted-foreground">
            Monthly inventory completed
          </p>
        </div>
        <Badge className="ml-auto" variant="secondary">Completed</Badge>
      </div>
    </div>
  )
}

