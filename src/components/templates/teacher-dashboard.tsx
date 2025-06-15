import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { TeacherMetricsGrid } from "../organismos/teacher/teacher-metrics-grid"
import { TeacherSubjectsTable } from "../organismos/teacher/teacher-subjects-table"
import { TeacherStudentsTable } from "../organismos/teacher/teacher-students-table"
import { GradesManagement } from "../organismos/grades-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

import {
  Home,
  BookOpen,
  Users,
  Award,
  UserCheck,
  ClipboardList,
  FileText,
  MessageSquare,
  Calendar,
  BookMarked,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react"
import type { MenuGrupo } from "../../types/sidebar-menu"
import { AppSidebar } from "../organismos/AppSidebar"
import { DashboardHeader } from "../organismos/AppNavbar"

const sidebarMenu: MenuGrupo[] = [
  {
    titulo: "Académico",
    items: [
      {
        titulo: "Dashboard",
        url: "#",
        icon: Home,
      },
      {
        titulo: "Mis Materias",
        url: "#/materias",
        icon: BookOpen,
        badge: "5",
        submenu: [
          { titulo: "Materias Activas", url: "#/materias/activas" },
          { titulo: "Horarios", url: "#/materias/horarios" },
          { titulo: "Contenido Programático", url: "#/materias/contenido" },
        ],
      },
      {
        titulo: "Estudiantes",
        url: "#/estudiantes",
        icon: Users,
        badge: "127",
        submenu: [
          { titulo: "Lista de Estudiantes", url: "#/estudiantes/lista" },
          { titulo: "Grupos por Materia", url: "#/estudiantes/grupos" },
          { titulo: "Expedientes", url: "#/estudiantes/expedientes" },
        ],
      },
      {
        titulo: "Calificaciones",
        url: "#/calificaciones",
        icon: Award,
        submenu: [
          { titulo: "Captura de Notas", url: "#/calificaciones/captura" },
          { titulo: "Historial", url: "#/calificaciones/historial" },
          { titulo: "Reportes de Notas", url: "#/calificaciones/reportes" },
        ],
      },
    ],
  },
  {
    titulo: "Seguimiento",
    items: [
      {
        titulo: "Asistencia",
        url: "#/asistencia",
        icon: UserCheck,
        submenu: [
          { titulo: "Tomar Asistencia", url: "#/asistencia/tomar" },
          { titulo: "Reportes", url: "#/asistencia/reportes" },
          { titulo: "Justificaciones", url: "#/asistencia/justificaciones" },
        ],
      },
      {
        titulo: "Tareas y Actividades",
        url: "#/tareas",
        icon: ClipboardList,
        badge: "8",
      },
      {
        titulo: "Evaluaciones",
        url: "#/evaluaciones",
        icon: FileText,
      },
    ],
  },
  {
    titulo: "Comunicación",
    items: [
      {
        titulo: "Mensajes",
        url: "#/mensajes",
        icon: MessageSquare,
        badge: "3",
      },
      {
        titulo: "Calendario",
        url: "#/calendario",
        icon: Calendar,
      },
      {
        titulo: "Recursos",
        url: "#/recursos",
        icon: BookMarked,
      },
    ],
  },
  {
    titulo: "Herramientas",
    items: [
      {
        titulo: "Estadísticas",
        url: "#/estadisticas",
        icon: BarChart3,
      },
      {
        titulo: "Configuración",
        url: "#/configuracion",
        icon: Settings,
      },
      {
        titulo: "Ayuda",
        url: "#/ayuda",
        icon: HelpCircle,
      },
    ],
  },
]



export function TeacherDashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar sidebarMenu={sidebarMenu} />
      <SidebarInset>
        <DashboardHeader
          titulo="Portal Docente"
          subtitulo="Dr. Roberto Méndez - Ingeniería de Software"
          userName="Dr. Roberto Méndez"
          userAvatar="/placeholder.svg?height=32&width=32"
          searchPlaceholder="Buscar estudiantes, materias..."
          showCalendar
          showNotifications
        />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Panel Docente</h2>
              <p className="text-sm text-muted-foreground">Bienvenido, Dr. Roberto Méndez</p>
            </div>

            <TeacherMetricsGrid />

            {/* Tabs para diferentes secciones */}
            <Tabs defaultValue="subjects" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="subjects">Mis Materias</TabsTrigger>
                <TabsTrigger value="students">Estudiantes</TabsTrigger>
                <TabsTrigger value="grades">Calificaciones</TabsTrigger>
              </TabsList>
              <TabsContent value="subjects" className="mt-4">
                <TeacherSubjectsTable />
              </TabsContent>
              <TabsContent value="students" className="mt-4">
                <TeacherStudentsTable />
              </TabsContent>
              <TabsContent value="grades" className="mt-4">
                <GradesManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
