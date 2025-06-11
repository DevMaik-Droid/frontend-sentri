import { BookOpen, Users, Award, UserCheck, ClipboardList, MessageSquare } from "lucide-react"
import { MetricCard } from "../../moleculas/metric-card"

const teacherMetricsData = [
  {
    title: "Materias Asignadas",
    value: "5",
    description: "Semestre actual",
    icon: BookOpen,
    trend: "neutral" as const,
  },
  {
    title: "Total Estudiantes",
    value: "127",
    description: "En todas las materias",
    icon: Users,
    trend: "up" as const,
  },
  {
    title: "Promedio General",
    value: "8.2",
    description: "+0.3 vs semestre anterior",
    icon: Award,
    trend: "up" as const,
  },
  {
    title: "Asistencia Promedio",
    value: "85%",
    description: "+2% vs mes anterior",
    icon: UserCheck,
    trend: "up" as const,
  },
  {
    title: "Tareas Pendientes",
    value: "8",
    description: "Por revisar",
    icon: ClipboardList,
    trend: "neutral" as const,
  },
  {
    title: "Mensajes",
    value: "3",
    description: "Sin leer",
    icon: MessageSquare,
    trend: "neutral" as const,
  },
]

export function TeacherMetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {teacherMetricsData.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          icon={metric.icon}
          trend={metric.trend}
        />
      ))}
    </div>
  )
}
