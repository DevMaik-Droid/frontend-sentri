import { Bell, Calendar, MessageSquare } from "lucide-react"
import { Button } from "../../ui/button"
import { SidebarTrigger } from "../../ui/sidebar"
import { SearchBar } from "../../moleculas/search-bar"
import { UserMenu } from "../../moleculas/user-menu"

export function StudentHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center gap-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Portal Estudiante</h1>
          <p className="text-sm text-muted-foreground">Ana García - Ingeniería de Software</p>
        </div>
        <div className="flex items-center gap-2">
          <SearchBar
            placeholder="Buscar materias, tareas..."
            className="w-[300px] hidden md:block"
            onSearch={(value) => console.log("Searching:", value)}
          />
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <MessageSquare className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>
          <UserMenu variant="header" userName="Ana García" userAvatar="/placeholder.svg?height=32&width=32" />
        </div>
      </div>
    </header>
  )
}
