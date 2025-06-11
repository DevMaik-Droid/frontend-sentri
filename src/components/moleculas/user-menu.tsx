import { User } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { AvatarImage } from "../atomos/avatar-image"

interface UserMenuProps {
  userName?: string
  userAvatar?: string
  variant?: "sidebar" | "header"
}

export function UserMenu({ userName = "Admin User", userAvatar, variant = "header" }: UserMenuProps) {
  if (variant === "sidebar") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start gap-2 px-2">
            <User className="h-4 w-4" />
            <span className="truncate">{userName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configuración</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <AvatarImage src={userAvatar || "/placeholder.svg?height=32&width=32"} alt={userName} size="md" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configuración</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
