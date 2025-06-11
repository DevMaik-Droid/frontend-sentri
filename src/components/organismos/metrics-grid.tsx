import { GraduationCap, Users, BookOpen, Calendar, Clock, Briefcase } from "lucide-react"
import { MetricCard } from "../moleculas/metric-card"

const metricsData = [
  {
    title: "Total Estudiantes",
    value: "245",
    description: "+12% desde el mes pasado",
    icon: GraduationCap,
    trend: "up" as const,
  },
  {
    title: "Docentes",
    value: "32",
    description: "+3 nuevos docentes",
    icon: Users,
    trend: "up" as const,
  },
  {
    title: "Materias",
    value: "18",
    description: "Semestre actual",
    icon: BookOpen,
    trend: "neutral" as const,
  },
  {
    title: "Semestres Activos",
    value: "2",
    description: "En curso",
    icon: Calendar,
    trend: "neutral" as const,
  },
  {
    title: "Cursos Temporales",
    value: "5",
    description: "+2 nuevos cursos",
    icon: Clock,
    trend: "up" as const,
  },
  {
    title: "Talleres",
    value: "8",
    description: "3 finalizados, 5 en curso",
    icon: Briefcase,
    trend: "up" as const,
  },
]

export function MetricsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metricsData.map((metric) => (
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
