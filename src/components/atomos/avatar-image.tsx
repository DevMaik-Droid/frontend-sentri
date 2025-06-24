import { cn } from "../../lib/utils"

interface AvatarImageProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  
}

export function AvatarImageCustom({ src, alt, size = "md", className }: AvatarImageProps) {
  return (
    <img
      src={src}
      width={size === "sm" ? 24 : size === "md" ? 32 : 40}
      height={size === "sm" ? 24 : size === "md" ? 32 : 40}
      className={cn("rounded-full object-cover", sizeClasses[size], className)}
      alt={alt}
    />
  )
}
