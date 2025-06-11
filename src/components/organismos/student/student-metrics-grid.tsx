import { BookOpen, Award, UserCheck, ClipboardList, Calendar, BarChart3 } from "lucide-react"
import { MetricCard } from "../../moleculas/metric-card"

const studentMetricsData = [
  {
    title: "Materias Cursando",
    value: "6",
    description: "Semestre actual",
    icon: BookOpen,
    trend: "neutral" as const,
  },
  {
    title: "Promedio General",
    value: "8.7",
    description: "+0.2 vs semestre anterior",
    icon: Award,
    trend: "up" as const,
  },
  {
    title: "Asistencia",
    value: "92%",
    description: "Excelente asistencia",
    icon: UserCheck,
    trend: "up" as const,
  },
  {
    title: "Tareas Pendientes",
    value: "5",
    description: "2 vencen esta semana",
    icon: ClipboardList,
    trend: "neutral" as const,
  },
  {
    title: "Próximos Exámenes",
    value: "2",
    description: "En los próximos 7 días",
    icon: Calendar,
    trend: "neutral" as const,
  },
  {
    title: "Créditos Completados",
    value: "85%",
    description: "Del plan de estudios",
    icon: BarChart3,
    trend: "up" as const,
  },
]

export function StudentMetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {studentMetricsData.map((metric) => (
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
