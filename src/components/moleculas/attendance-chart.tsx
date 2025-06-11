"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface AttendanceData {
  name: string
  asistencia: number
  ausencia: number
  justificada: number
}

interface AttendanceChartProps {
  data: AttendanceData[]
  title?: string
  description?: string
}

export function AttendanceChart({ data, title = "Asistencia por Materia", description }: AttendanceChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="asistencia" name="Asistencia" fill="#4ade80" />
            <Bar dataKey="ausencia" name="Ausencia" fill="#f87171" />
            <Bar dataKey="justificada" name="Justificada" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
