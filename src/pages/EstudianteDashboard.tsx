import {
  Home,
  BookOpen,
  Award,
  UserCheck,
  ClipboardList,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  Bell,
  BookMarked,
  Clock,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import type { MenuGrupo } from "../types/sidebar-menu";
import { DashboardLayout } from "../components/templates/dashboard-layout";
import type { AppNavbarProps } from "../types/navbar-props";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


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
        badge: "6",
        submenu: [
          { titulo: "Materias Actuales", url: "#/materias/actuales" },
          { titulo: "Horarios", url: "#/materias/horarios" },
          { titulo: "Contenidos", url: "#/materias/contenidos" },
          { titulo: "Historial", url: "#/materias/historial" },
        ],
      },
      {
        titulo: "Calificaciones",
        url: "#/calificaciones",
        icon: Award,
        submenu: [
          { titulo: "Notas Actuales", url: "#/calificaciones/actuales" },
          { titulo: "Historial", url: "#/calificaciones/historial" },
          {
            titulo: "Boleta de Calificaciones",
            url: "#/calificaciones/boleta",
          },
        ],
      },
      {
        titulo: "Asistencia",
        url: "#/asistencia",
        icon: UserCheck,
        submenu: [
          { titulo: "Mi Asistencia", url: "#/asistencia/mi-asistencia" },
          { titulo: "Justificaciones", url: "#/asistencia/justificaciones" },
          { titulo: "Reportes", url: "#/asistencia/reportes" },
        ],
      },
      {
        titulo: "Inscripcciones",
        url: "/inscripciones",
        icon: UserCheck,
        submenu: [
          { titulo: "Materias", url: "inscripcion/materias" },
          { titulo: "Talleres", url: "/inscripcciones/talleres" }
        ],
      },
    ],
  },
  {
    titulo: "Actividades",
    items: [
      {
        titulo: "Tareas",
        url: "#/tareas",
        icon: ClipboardList,
        badge: "5",
        submenu: [
          { titulo: "Pendientes", url: "#/tareas/pendientes" },
          { titulo: "Entregadas", url: "#/tareas/entregadas" },
          { titulo: "Calificadas", url: "#/tareas/calificadas" },
        ],
      },
      {
        titulo: "Exámenes",
        url: "#/examenes",
        icon: FileText,
        badge: "2",
      },
      {
        titulo: "Proyectos",
        url: "#/proyectos",
        icon: Users,
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
        titulo: "Notificaciones",
        url: "#/notificaciones",
        icon: Bell,
        badge: "7",
      },
    ],
  },
  {
    titulo: "Recursos",
    items: [
      {
        titulo: "Biblioteca Digital",
        url: "#/biblioteca",
        icon: BookMarked,
      },
      {
        titulo: "Horarios",
        url: "#/horarios",
        icon: Clock,
      },
      {
        titulo: "Mi Progreso",
        url: "#/progreso",
        icon: BarChart3,
      },
    ],
  },
  {
    titulo: "Configuración",
    items: [
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
];

export default function EstudianteDashboard() {
  const { usuario } = useAuth();
  

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  

  

  const navbarProps: AppNavbarProps = {
    titulo: "Portal Estudiante",
    userName: `${usuario?.nombre} ${usuario?.apellido}`,
    subtitulo: `${usuario?.nombre} - Ingeniería de Sistemas`,
    userAvatar: "/placeholder.svg?height=32&width=32",
    searchPlaceholder: "Buscar materias, tareas...",
    showCalendar: true,
    showMessages: true,
    showNotifications: true,
  };

  return (
    <DashboardLayout
      sidebarMenu={sidebarMenu}
      navbaritems={navbarProps}
    ></DashboardLayout>
  );
}
