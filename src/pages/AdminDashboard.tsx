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
  FileText,
  BookMarked,
  Award,
  PieChart,
  UserCheck,
  Layers,
  MessageSquare,
  HelpCircle
} from "lucide-react"
import type { MenuGrupo } from "../types/sidebar-menu"
import { DashboardLayout } from "../components/templates/dashboard-layout";
import type { AppNavbarProps } from "../types/navbar-props";

const sidebarMenu: MenuGrupo[] = [
  {
    titulo: "Principal",
    items: [
      {
        titulo: "Dashboard",
        url: "/admin",
        icon: Home,
      },
    ],
  },
  {
    titulo: "Estudiantes y Docentes",
    items: [
      {
        titulo: "Estudiantes",
        url: "/estudiantes",
        icon: GraduationCap,
        badge: "245",
        submenu: [
          { titulo: "Lista de Estudiantes", url: "/dashboard/estudiantes/lista" },
          { titulo: "Registro de Asistencia", url: "/dashboard/estudiantes/asistencia" },
          { titulo: "Calificaciones", url: "/dashboard/estudiantes/calificaciones" },
          { titulo: "Expedientes", url: "/dashboard/estudiantes/expedientes" },
        ],
      },
      {
        titulo: "Docentes",
        url: "/docentes",
        icon: Users,
        badge: "32",
        submenu: [
          { titulo: "Lista de Docentes", url: "/docentes/lista" },
          { titulo: "Asignación de Cursos", url: "/docentes/asignacion" },
          { titulo: "Evaluación Docente", url: "/docentes/evaluacion" },
        ],
      },
    ],
  },
  {
    titulo: "Materias",
    items: [
      {
        titulo: "Materias",
        url: "/materias",
        icon: BookOpen,
        badge: "18",
        submenu: [
          { titulo: "Catálogo de Materias", url: "/materias/catalogo" },
          { titulo: "Plan de Estudios", url: "/materias/plan" },
          { titulo: "Contenidos", url: "/materias/contenidos" },
        ],
      },
    ],
  },

  {
    titulo: "Periodos Académicos",
    items: [
      {
        titulo: "Semestres",
        url: "/semestres",
        icon: Calendar,
        submenu: [
          { titulo: "Calendario Académico", url: "/semestres/calendario" },
          { titulo: "Periodos Activos", url: "/semestres/activos" },
          { titulo: "Planificación", url: "/semestres/planificacion" },
        ],
      },
      {
        titulo: "Cursos Temporales",
        url: "/cursos-temporales",
        icon: Clock,
        badge: "5",
      },
      {
        titulo: "Talleres",
        url: "/talleres",
        icon: Briefcase,
        badge: "8",
      },
    ],
  },
  {
    titulo: "Evaluación y Seguimiento",
    items: [
      {
        titulo: "Asistencia",
        url: "/asistencia",
        icon: UserCheck,
      },
      {
        titulo: "Calificaciones",
        url: "/calificaciones",
        icon: Award,
      },
      {
        titulo: "Reportes Académicos",
        url: "/reportes-academicos",
        icon: FileText,
      },
      {
        titulo: "Estadísticas",
        url: "/estadisticas",
        icon: PieChart,
      },
    ],
  },
  {
    titulo: "Administración",
    items: [
      {
        titulo: "Horarios",
        url: "/horarios",
        icon: BarChart3,
        submenu: [
          { titulo: "Crear Paralelo", url: "horarios/paralelo" },
          { titulo: "Administrar Paralelo", url: "horarios/paralelo/administrar" }
        ],
      },
      {
        titulo: "Reportes",
        url: "/reportes",
        icon: BarChart3,
        submenu: [
          { titulo: "Rendimiento Académico", url: "/reportes/rendimiento" },
          { titulo: "Asistencia", url: "/reportes/asistencia" },
          { titulo: "Financieros", url: "/reportes/financieros" },
          { titulo: "Exportar Datos", url: "/reportes/exportar" },
        ],
      },
      {
        titulo: "Configuración",
        url: "/configuracion",
        icon: Settings,
        submenu: [
          { titulo: "Institución", url: "/configuracion/institucion" },
          { titulo: "Usuarios", url: "/configuracion/usuarios" },
          { titulo: "Permisos", url: "/configuracion/permisos" },
          { titulo: "Notificaciones", url: "/configuracion/notificaciones" },
        ],
      },
      {
        titulo: "Comunicaciones",
        url: "/comunicaciones",
        icon: MessageSquare,
        badge: "3",
      },
    ],
  },
  {
    titulo: "Recursos",
    items: [
      {
        titulo: "Biblioteca Digital",
        url: "/biblioteca",
        icon: BookMarked,
      },
      {
        titulo: "Recursos Didácticos",
        url: "/recursos",
        icon: Layers,
      },
      {
        titulo: "Ayuda y Soporte",
        url: "/ayuda",
        icon: HelpCircle,
      },
    ],
  },
];

const navbarProps : AppNavbarProps = {
  titulo: "Portal Administrador",
  subtitulo: "Ana García - Ingeniería de Software",
  userName: "Ana García",
  userAvatar: "/placeholder.svg?height=32&width=32",
  searchPlaceholder: "Buscar materias, docentes, asistencias",

}

export default function AdminDashboard() {
  return (
    <DashboardLayout sidebarMenu={sidebarMenu} navbaritems={navbarProps}>
      
    </DashboardLayout>
  )
}
