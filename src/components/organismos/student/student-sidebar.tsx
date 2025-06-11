"use client"
import {
  BookOpen,
  Calendar,
  Award,
  BarChart3,
  Settings,
  Home,
  ChevronRight,
  ClipboardList,
  MessageSquare,
  UserCheck,
  BookMarked,
  HelpCircle,
  FileText,
  Users,
  Clock,
  Bell,
} from "lucide-react"
import React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../../ui/sidebar"
import { CustomBadge } from "../../atomos/custom-badge"
import { IconWrapper } from "../../atomos/icon-wrapper"
import { UserMenu } from "../../moleculas/user-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible"

// Elementos del menú principal - Académico
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Mis Materias",
    url: "#/materias",
    icon: BookOpen,
    badge: "6",
    submenu: [
      { title: "Materias Actuales", url: "#/materias/actuales" },
      { title: "Horarios", url: "#/materias/horarios" },
      { title: "Contenidos", url: "#/materias/contenidos" },
      { title: "Historial", url: "#/materias/historial" },
    ],
  },
  {
    title: "Calificaciones",
    url: "#/calificaciones",
    icon: Award,
    submenu: [
      { title: "Notas Actuales", url: "#/calificaciones/actuales" },
      { title: "Historial", url: "#/calificaciones/historial" },
      { title: "Boleta de Calificaciones", url: "#/calificaciones/boleta" },
    ],
  },
  {
    title: "Asistencia",
    url: "#/asistencia",
    icon: UserCheck,
    submenu: [
      { title: "Mi Asistencia", url: "#/asistencia/mi-asistencia" },
      { title: "Justificaciones", url: "#/asistencia/justificaciones" },
      { title: "Reportes", url: "#/asistencia/reportes" },
    ],
  },
]

// Elementos del menú de actividades
const actividadesItems = [
  {
    title: "Tareas",
    url: "#/tareas",
    icon: ClipboardList,
    badge: "5",
    submenu: [
      { title: "Pendientes", url: "#/tareas/pendientes" },
      { title: "Entregadas", url: "#/tareas/entregadas" },
      { title: "Calificadas", url: "#/tareas/calificadas" },
    ],
  },
  {
    title: "Exámenes",
    url: "#/examenes",
    icon: FileText,
    badge: "2",
  },
  {
    title: "Proyectos",
    url: "#/proyectos",
    icon: Users,
  },
]

// Elementos del menú de comunicación
const comunicacionItems = [
  {
    title: "Mensajes",
    url: "#/mensajes",
    icon: MessageSquare,
    badge: "3",
  },
  {
    title: "Calendario",
    url: "#/calendario",
    icon: Calendar,
  },
  {
    title: "Notificaciones",
    url: "#/notificaciones",
    icon: Bell,
    badge: "7",
  },
]

// Elementos del menú de recursos
const recursosItems = [
  {
    title: "Biblioteca Digital",
    url: "#/biblioteca",
    icon: BookMarked,
  },
  {
    title: "Horarios",
    url: "#/horarios",
    icon: Clock,
  },
  {
    title: "Mi Progreso",
    url: "#/progreso",
    icon: BarChart3,
  },
]

// Elementos del menú de configuración
const configItems = [
  {
    title: "Configuración",
    url: "#/configuracion",
    icon: Settings,
  },
  {
    title: "Ayuda",
    url: "#/ayuda",
    icon: HelpCircle,
  },
]

export function StudentSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Portal Estudiante</span>
                  <span className="text-xs text-muted-foreground">Sistema Académico</span>
                </div>
                <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=expanded]:rotate-90" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Académico */}
        <SidebarGroup>
          <SidebarGroupLabel>Académico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <Collapsible className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
                            <IconWrapper icon={item.icon} />
                            <span>{item.title}</span>
                            {item.badge && (
                              <CustomBadge variant="secondary" className="ml-auto">
                                {item.badge}
                              </CustomBadge>
                            )}
                            <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>{subItem.title}</a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                        <a href={item.url} className="flex items-center gap-2">
                          <IconWrapper icon={item.icon} />
                          <span>{item.title}</span>
                          {item.badge && (
                            <CustomBadge variant="secondary" className="ml-auto">
                              {item.badge}
                            </CustomBadge>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Actividades */}
        <SidebarGroup>
          <SidebarGroupLabel>Actividades</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {actividadesItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <Collapsible className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <IconWrapper icon={item.icon} />
                            <span>{item.title}</span>
                            {item.badge && (
                              <CustomBadge variant="secondary" className="ml-auto">
                                {item.badge}
                              </CustomBadge>
                            )}
                            <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>{subItem.title}</a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url} className="flex items-center gap-2">
                          <IconWrapper icon={item.icon} />
                          <span>{item.title}</span>
                          {item.badge && (
                            <CustomBadge variant="secondary" className="ml-auto">
                              {item.badge}
                            </CustomBadge>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Comunicación */}
        <SidebarGroup>
          <SidebarGroupLabel>Comunicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {comunicacionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-2">
                      <IconWrapper icon={item.icon} />
                      <span>{item.title}</span>
                      {item.badge && (
                        <CustomBadge variant="secondary" className="ml-auto">
                          {item.badge}
                        </CustomBadge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recursos */}
        <SidebarGroup>
          <SidebarGroupLabel>Recursos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recursosItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-2">
                      <IconWrapper icon={item.icon} />
                      <span>{item.title}</span>
                      {item.badge && (
                        <CustomBadge variant="secondary" className="ml-auto">
                          {item.badge}
                        </CustomBadge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configuración */}
        <SidebarGroup>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-2">
                      <IconWrapper icon={item.icon} />
                      <span>{item.title}</span>
                      {item.badge && (
                        <CustomBadge variant="secondary" className="ml-auto">
                          {item.badge}
                        </CustomBadge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu variant="sidebar" userName="Ana García" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
