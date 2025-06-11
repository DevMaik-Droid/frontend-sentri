import { Bell } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { SearchBar } from "../moleculas/search-bar"
import { UserMenu } from "../moleculas/user-menu"

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Sistema de Gestión Académica</h1>
        </div>
        <div className="flex items-center gap-2">
          <SearchBar
            placeholder="Buscar estudiantes, docentes, materias..."
            className="w-[300px] hidden md:block"
            onSearch={(value) => console.log("Searching:", value)}
          />
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <UserMenu variant="header" userName="Admin User" userAvatar="/placeholder.svg?height=32&width=32" />
        </div>
      </div>
    </header>
  )
}
