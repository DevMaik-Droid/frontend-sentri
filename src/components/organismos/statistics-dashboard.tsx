"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { AttendanceChart } from "../moleculas/attendance-chart"
import { GradesChart } from "../moleculas/grades-chart"
import { AttendanceDonutChart } from "../moleculas/attendance-donut-chart"
import { GradesDistributionChart } from "../moleculas/grades-distribution-chart"

// Datos de ejemplo para asistencia por materia
const attendanceData = [
  {
    name: "Matemáticas",
    asistencia: 85,
    ausencia: 10,
    justificada: 5,
  },
  {
    name: "Programación",
    asistencia: 90,
    ausencia: 5,
    justificada: 5,
  },
  {
    name: "Base de Datos",
    asistencia: 75,
    ausencia: 15,
    justificada: 10,
  },
  {
    name: "Inglés",
    asistencia: 80,
    ausencia: 12,
    justificada: 8,
  },
  {
    name: "Diseño Web",
    asistencia: 88,
    ausencia: 7,
    justificada: 5,
  },
]

// Datos de ejemplo para promedios por materia
const gradesData = [
  {
    name: "Matemáticas",
    promedio: 7.5,
    minimo: 5.0,
    maximo: 9.8,
  },
  {
    name: "Programación",
    promedio: 8.2,
    minimo: 6.5,
    maximo: 10.0,
  },
  {
    name: "Base de Datos",
    promedio: 7.8,
    minimo: 5.5,
    maximo: 9.5,
  },
  {
    name: "Inglés",
    promedio: 8.5,
    minimo: 7.0,
    maximo: 10.0,
  },
  {
    name: "Diseño Web",
    promedio: 8.0,
    minimo: 6.0,
    maximo: 9.7,
  },
]

// Datos de ejemplo para distribución de asistencia
const attendanceDonutData = [
  { name: "Asistencia", value: 82, color: "#4ade80" },
  { name: "Ausencia", value: 10, color: "#f87171" },
  { name: "Justificada", value: 8, color: "#fbbf24" },
]

// Datos de ejemplo para distribución de calificaciones
const gradesDistributionData = [
  { range: "0-5.9", estudiantes: 15 },
  { range: "6.0-6.9", estudiantes: 25 },
  { range: "7.0-7.9", estudiantes: 45 },
  { range: "8.0-8.9", estudiantes: 80 },
  { range: "9.0-10", estudiantes: 35 },
]

export function StatisticsDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Estadísticas Académicas</h2>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList>
          <TabsTrigger value="attendance">Asistencia</TabsTrigger>
          <TabsTrigger value="grades">Calificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AttendanceChart
              data={attendanceData}
              title="Asistencia por Materia"
              description="Porcentaje de asistencia, ausencias y faltas justificadas por materia"
            />
            <AttendanceDonutChart
              data={attendanceDonutData}
              title="Distribución General de Asistencia"
              description="Porcentaje global de asistencia, ausencias y faltas justificadas"
            />
          </div>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <GradesChart
              data={gradesData}
              title="Promedio de Calificaciones por Materia"
              description="Promedio, calificación mínima y máxima por materia"
            />
            <GradesDistributionChart
              data={gradesDistributionData}
              title="Distribución de Calificaciones"
              description="Número de estudiantes por rango de calificación"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
