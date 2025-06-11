import type React from "react"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"

interface CustomBadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

export function CustomBadge({ children, variant = "default", className }: CustomBadgeProps) {
  return (
    <Badge variant={variant} className={cn("text-xs", className)}>
      {children}
    </Badge>
  )
}
