import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { IconWrapper } from "../atomos/icon-wrapper"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function MetricCard({ title, value, description, icon, trend = "neutral" }: MetricCardProps) {
  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground",
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconWrapper icon={icon} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor[trend]}`}>{description}</p>
      </CardContent>
    </Card>
  )
}
