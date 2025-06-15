import { Bell, Calendar, MessageSquare } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { SearchBar } from "../moleculas/search-bar"
import { UserMenu } from "../moleculas/user-menu"
import type { AppNavbarProps } from "../../types/navbar-props"

export function DashboardHeader({
  titulo,
  subtitulo,
  userName,
  userAvatar,
  searchPlaceholder,
  showCalendar = false,
  showMessages = false,
  showNotifications = true,
}: AppNavbarProps) {
  return (
    <nav className="flex h-16 shrink items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="flex w-full justify-between">
        <div className="flex-1 w-1/3">
          <h1 className="text-lg font-semibold">{titulo}</h1>
          {subtitulo && <p className="text-sm text-muted-foreground">{subtitulo}</p>}
        </div>
        <div className="flex items-center gap-2">
          <SearchBar
            placeholder={searchPlaceholder}
            className="w-[300px] hidden md:block"
            onSearch={(value) => console.log("Searching:", value)}
          />
          {showCalendar && (
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          )}
          {showMessages && (
            <Button variant="outline" size="icon" className="relative">
              <MessageSquare className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
          )}
          {showNotifications && (
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
          )}
          <UserMenu
            variant="header"
            userName={userName}
            userAvatar={userAvatar}
          />
        </div>
      </div>
    </nav>
  )
}

