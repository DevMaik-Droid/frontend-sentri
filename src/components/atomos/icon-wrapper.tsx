import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

interface IconWrapperProps {
  icon: LucideIcon
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

export function IconWrapper({ icon: Icon, className, size = "md" }: IconWrapperProps) {
  return <Icon className={cn(sizeClasses[size], className)} />
}
