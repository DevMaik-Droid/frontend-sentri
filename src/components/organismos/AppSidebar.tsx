"use client"

import { useNavigate } from "react-router-dom"

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar"
import { UserMenu } from "../moleculas/user-menu"
import { ContenidoSidebar } from "../moleculas/sidebar-content"
import type { MenuGrupo } from "../../types/sidebar-menu"
import { ChevronRight, GraduationCap } from "lucide-react"



export function AppSidebar({ sidebarMenu } : { sidebarMenu: MenuGrupo[] }) {
  const navigate = useNavigate()

  const handleNavigation = (url: string) => {
    navigate(url)
  }

  return (
    <Sidebar collapsible="icon" className="border-r" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => handleNavigation("/admin")}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Edu Admin</span>
                <span className="text-xs text-muted-foreground">Sistema Académico</span>
              </div>
              <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=expanded]:rotate-90" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <ContenidoSidebar p_items = {sidebarMenu}></ContenidoSidebar>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu variant="sidebar" userName="Admin User" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
