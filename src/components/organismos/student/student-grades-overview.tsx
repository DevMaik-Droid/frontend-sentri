"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Progress } from "../../ui/progress"
import { Badge } from "../../ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const gradesData = [
  { subject: "POO", grade: 8.5, target: 9.0 },
  { subject: "Cálculo", grade: 9.0, target: 8.5 },
  { subject: "Inglés", grade: 8.8, target: 8.0 },
  { subject: "BD", grade: 7.5, target: 8.0 },
  { subject: "Metodología", grade: 9.2, target: 9.0 },
]

const progressData = [
  { month: "Ago", promedio: 7.8 },
  { month: "Sep", promedio: 8.1 },
  { month: "Oct", promedio: 8.3 },
  { month: "Nov", promedio: 8.5 },
  { month: "Dic", promedio: 8.7 },
]

export function StudentGradesOverview() {
  const overallAverage = gradesData.reduce((sum, item) => sum + item.grade, 0) / gradesData.length

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calificaciones por Materia</CardTitle>
          <CardDescription>Calificaciones actuales vs objetivos</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="grade" name="Calificación Actual" fill="#3b82f6" />
              <Bar dataKey="target" name="Objetivo" fill="#e5e7eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progreso del Semestre</CardTitle>
          <CardDescription>Evolución del promedio general</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Promedio General</span>
              <Badge variant="default" className="text-lg px-3 py-1">
                {overallAverage.toFixed(1)}
              </Badge>
            </div>
            <Progress value={(overallAverage / 10) * 100} className="h-3" />
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[7, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="promedio" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
