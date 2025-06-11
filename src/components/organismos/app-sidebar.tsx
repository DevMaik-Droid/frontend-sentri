"use client"
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  Clock,
  Briefcase,
  BarChart3,
  Settings,
  Home,
  ChevronRight,
  FileText,
  BookMarked,
  Award,
  PieChart,
  UserCheck,
  Layers,
  MessageSquare,
  HelpCircle,
} from "lucide-react"
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

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
} from "../ui/sidebar"
import { CustomBadge } from "../atomos/custom-badge"
import { IconWrapper } from "../atomos/icon-wrapper"
import { UserMenu } from "../moleculas/user-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

// Elementos del menú principal - Gestión académica
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Estudiantes",
    url: "/estudiantes",
    icon: GraduationCap,
    badge: "245",
    submenu: [
      { title: "Lista de Estudiantes", url: "/estudiantes/lista" },
      { title: "Registro de Asistencia", url: "/estudiantes/asistencia" },
      { title: "Calificaciones", url: "/estudiantes/calificaciones" },
      { title: "Expedientes", url: "/estudiantes/expedientes" },
    ],
  },
  {
    title: "Docentes",
    url: "/docentes",
    icon: Users,
    badge: "32",
    submenu: [
      { title: "Lista de Docentes", url: "/docentes/lista" },
      { title: "Asignación de Cursos", url: "/docentes/asignacion" },
      { title: "Evaluación Docente", url: "/docentes/evaluacion" },
    ],
  },
  {
    title: "Materias",
    url: "/materias",
    icon: BookOpen,
    badge: "18",
    submenu: [
      { title: "Catálogo de Materias", url: "/materias/catalogo" },
      { title: "Plan de Estudios", url: "/materias/plan" },
      { title: "Contenidos", url: "/materias/contenidos" },
    ],
  },
]

// Elementos del menú de periodos académicos
const periodosItems = [
  {
    title: "Semestres",
    url: "/semestres",
    icon: Calendar,
    submenu: [
      { title: "Calendario Académico", url: "/semestres/calendario" },
      { title: "Periodos Activos", url: "/semestres/activos" },
      { title: "Planificación", url: "/semestres/planificacion" },
    ],
  },
  {
    title: "Cursos Temporales",
    url: "/cursos-temporales",
    icon: Clock,
    badge: "5",
  },
  {
    title: "Talleres",
    url: "/talleres",
    icon: Briefcase,
    badge: "8",
  },
]

// Elementos del menú de evaluación y seguimiento
const evaluacionItems = [
  {
    title: "Asistencia",
    url: "/asistencia",
    icon: UserCheck,
  },
  {
    title: "Calificaciones",
    url: "/calificaciones",
    icon: Award,
  },
  {
    title: "Reportes Académicos",
    url: "/reportes-academicos",
    icon: FileText,
  },
  {
    title: "Estadísticas",
    url: "/estadisticas",
    icon: PieChart,
  },
]

// Elementos del menú de administración
const adminItems = [
  {
    title: "Reportes",
    url: "/reportes",
    icon: BarChart3,
    submenu: [
      { title: "Rendimiento Académico", url: "/reportes/rendimiento" },
      { title: "Asistencia", url: "/reportes/asistencia" },
      { title: "Financieros", url: "/reportes/financieros" },
      { title: "Exportar Datos", url: "/reportes/exportar" },
    ],
  },
  {
    title: "Configuración",
    url: "/configuracion",
    icon: Settings,
    submenu: [
      { title: "Institución", url: "/configuracion/institucion" },
      { title: "Usuarios", url: "/configuracion/usuarios" },
      { title: "Permisos", url: "/configuracion/permisos" },
      { title: "Notificaciones", url: "/configuracion/notificaciones" },
    ],
  },
  {
    title: "Comunicaciones",
    url: "/comunicaciones",
    icon: MessageSquare,
    badge: "3",
  },
]

// Elementos del menú de recursos
const recursosItems = [
  {
    title: "Biblioteca Digital",
    url: "/biblioteca",
    icon: BookMarked,
  },
  {
    title: "Recursos Didácticos",
    url: "/recursos",
    icon: Layers,
  },
  {
    title: "Ayuda y Soporte",
    url: "/ayuda",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (url: string) => {
    navigate(url)
  }

  const isActive = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/")
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => handleNavigation("/admin")}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">EduAdmin</span>
                <span className="text-xs text-muted-foreground">Sistema Académico</span>
              </div>
              <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=expanded]:rotate-90" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Gestión Académica */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestión Académica</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <Collapsible className="group/collapsible" defaultOpen={isActive(item.url)}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} isActive={isActive(item.url)}>
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
                                <SidebarMenuSubButton
                                  onClick={() => handleNavigation(subItem.url)}
                                  isActive={location.pathname === subItem.url}
                                >
                                  {subItem.title}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={isActive(item.url)}
                        tooltip={item.title}
                        onClick={() => handleNavigation(item.url)}
                      >
                        <IconWrapper icon={item.icon} />
                        <span>{item.title}</span>
                        {item.badge && (
                          <CustomBadge variant="secondary" className="ml-auto">
                            {item.badge}
                          </CustomBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Periodos Académicos */}
        <SidebarGroup>
          <SidebarGroupLabel>Periodos Académicos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {periodosItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <Collapsible className="group/collapsible" defaultOpen={isActive(item.url)}>
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
                                <SidebarMenuSubButton
                                  onClick={() => handleNavigation(subItem.url)}
                                  isActive={location.pathname === subItem.url}
                                >
                                  {subItem.title}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => handleNavigation(item.url)}
                        isActive={isActive(item.url)}
                      >
                        <IconWrapper icon={item.icon} />
                        <span>{item.title}</span>
                        {item.badge && (
                          <CustomBadge variant="secondary" className="ml-auto">
                            {item.badge}
                          </CustomBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Evaluación y Seguimiento */}
        <SidebarGroup>
          <SidebarGroupLabel>Evaluación y Seguimiento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {evaluacionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => handleNavigation(item.url)}
                    isActive={isActive(item.url)}
                  >
                    <IconWrapper icon={item.icon} />
                    <span>{item.title}</span>
                    {item.badge && (
                      <CustomBadge variant="secondary" className="ml-auto">
                        {item.badge}
                      </CustomBadge>
                    )}
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
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => handleNavigation(item.url)}
                    isActive={isActive(item.url)}
                  >
                    <IconWrapper icon={item.icon} />
                    <span>{item.title}</span>
                    {item.badge && (
                      <CustomBadge variant="secondary" className="ml-auto">
                        {item.badge}
                      </CustomBadge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Administración */}
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <React.Fragment key={item.title}>
                  {item.submenu ? (
                    <Collapsible className="group/collapsible" defaultOpen={isActive(item.url)}>
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
                                <SidebarMenuSubButton
                                  onClick={() => handleNavigation(subItem.url)}
                                  isActive={location.pathname === subItem.url}
                                >
                                  {subItem.title}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => handleNavigation(item.url)}
                        isActive={isActive(item.url)}
                      >
                        <IconWrapper icon={item.icon} />
                        <span>{item.title}</span>
                        {item.badge && (
                          <CustomBadge variant="secondary" className="ml-auto">
                            {item.badge}
                          </CustomBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

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
