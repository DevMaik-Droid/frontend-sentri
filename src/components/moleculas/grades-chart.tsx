"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface GradesData {
  name: string
  promedio: number
  minimo: number
  maximo: number
}

interface GradesChartProps {
  data: GradesData[]
  title?: string
  description?: string
}

export function GradesChart({ data, title = "Promedio de Calificaciones", description }: GradesChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
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
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="promedio" name="Promedio" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="maximo" name="Máximo" stroke="#4ade80" strokeWidth={2} />
            <Line type="monotone" dataKey="minimo" name="Mínimo" stroke="#f87171" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
