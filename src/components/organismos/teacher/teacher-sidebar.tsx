"use client"
import {
  BookOpen,
  Users,
  FileText,
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

// Elementos del menú principal - Gestión docente
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
    badge: "5",
    submenu: [
      { title: "Materias Activas", url: "#/materias/activas" },
      { title: "Horarios", url: "#/materias/horarios" },
      { title: "Contenido Programático", url: "#/materias/contenido" },
    ],
  },
  {
    title: "Estudiantes",
    url: "#/estudiantes",
    icon: Users,
    badge: "127",
    submenu: [
      { title: "Lista de Estudiantes", url: "#/estudiantes/lista" },
      { title: "Grupos por Materia", url: "#/estudiantes/grupos" },
      { title: "Expedientes", url: "#/estudiantes/expedientes" },
    ],
  },
  {
    title: "Calificaciones",
    url: "#/calificaciones",
    icon: Award,
    submenu: [
      { title: "Captura de Notas", url: "#/calificaciones/captura" },
      { title: "Historial", url: "#/calificaciones/historial" },
      { title: "Reportes de Notas", url: "#/calificaciones/reportes" },
    ],
  },
]

// Elementos del menú de seguimiento
const seguimientoItems = [
  {
    title: "Asistencia",
    url: "#/asistencia",
    icon: UserCheck,
    submenu: [
      { title: "Tomar Asistencia", url: "#/asistencia/tomar" },
      { title: "Reportes", url: "#/asistencia/reportes" },
      { title: "Justificaciones", url: "#/asistencia/justificaciones" },
    ],
  },
  {
    title: "Tareas y Actividades",
    url: "#/tareas",
    icon: ClipboardList,
    badge: "8",
  },
  {
    title: "Evaluaciones",
    url: "#/evaluaciones",
    icon: FileText,
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
    title: "Recursos",
    url: "#/recursos",
    icon: BookMarked,
  },
]

// Elementos del menú de herramientas
const herramientasItems = [
  {
    title: "Estadísticas",
    url: "#/estadisticas",
    icon: BarChart3,
  },
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

export function TeacherSidebar() {
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
                  <span className="font-semibold">Portal Docente</span>
                  <span className="text-xs text-muted-foreground">Sistema Académico</span>
                </div>
                <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=expanded]:rotate-90" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Gestión Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestión Principal</SidebarGroupLabel>
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

        {/* Seguimiento Académico */}
        <SidebarGroup>
          <SidebarGroupLabel>Seguimiento Académico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {seguimientoItems.map((item) => (
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

        {/* Herramientas */}
        <SidebarGroup>
          <SidebarGroupLabel>Herramientas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {herramientasItems.map((item) => (
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
            <UserMenu variant="sidebar" userName="Dr. Roberto Méndez" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
