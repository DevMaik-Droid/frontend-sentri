"use client"

import { useState } from "react"
import { Calendar, Search, Filter, Download, Check, X, Clock, AlertCircle } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { AvatarImage } from "../../atomos/avatar-image"
import { CustomBadge } from "../../atomos/custom-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { AttendanceDonutChart } from "../../moleculas/attendance-donut-chart"
import { AttendanceChart } from "../../moleculas/attendance-chart"
import { DatePicker } from "../../moleculas/date-picker"

// Datos de ejemplo para asistencia
const attendanceData = [
  {
    id: "EST001",
    name: "Ana García",
    course: "Programación OO",
    date: "2024-01-10",
    status: "Presente",
    time: "08:05",
    justification: null,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST002",
    name: "Carlos Rodríguez",
    course: "Programación OO",
    date: "2024-01-10",
    status: "Ausente",
    time: "-",
    justification: "Enfermedad",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST003",
    name: "María López",
    course: "Programación OO",
    date: "2024-01-10",
    status: "Presente",
    time: "08:00",
    justification: null,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST004",
    name: "José Martínez",
    course: "Programación OO",
    date: "2024-01-10",
    status: "Tardanza",
    time: "08:20",
    justification: null,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST005",
    name: "Laura Sánchez",
    course: "Programación OO",
    date: "2024-01-10",
    status: "Presente",
    time: "07:55",
    justification: null,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST006",
    name: "Roberto Gómez",
    course: "Programación OO",
    date: "2024-01-10",
    status: "Ausente",
    time: "-",
    justification: null,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST007",
    name: "Patricia Flores",
    course: "Programación OO",
    date: "2024-01-10",
    status: "Presente",
    time: "08:02",
    justification: null,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Datos para gráficos
const attendanceChartData = [
  {
    name: "Programación OO",
    asistencia: 85,
    ausencia: 10,
    justificada: 5,
  },
  {
    name: "Cálculo",
    asistencia: 75,
    ausencia: 15,
    justificada: 10,
  },
  {
    name: "Base de Datos",
    asistencia: 90,
    ausencia: 5,
    justificada: 5,
  },
  {
    name: "Inglés",
    asistencia: 80,
    ausencia: 12,
    justificada: 8,
  },
]

const attendanceDonutData = [
  { name: "Presente", value: 82, color: "#4ade80" },
  { name: "Ausente", value: 10, color: "#f87171" },
  { name: "Justificado", value: 8, color: "#fbbf24" },
]

export function StudentAttendanceContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Filtrar asistencia basado en búsqueda y filtros
  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCourse = selectedCourse === "all" || record.course === selectedCourse

    return matchesSearch && matchesCourse
  })

  // Obtener cursos únicos para el filtro
  const uniqueCourses = Array.from(new Set(attendanceData.map((record) => record.course)))

  // Función para obtener el icono de estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Presente":
        return <Check className="h-4 w-4 text-green-500" />
      case "Ausente":
        return <X className="h-4 w-4 text-red-500" />
      case "Tardanza":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  // Función para obtener la variante de badge según el estado
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Presente":
        return "default"
      case "Ausente":
        return "destructive"
      case "Tardanza":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {/* Pestañas */}
      <Tabs defaultValue="register">
        <TabsList>
          <TabsTrigger value="register">Registro de Asistencia</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="justifications">Justificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-4 pt-4">
          {/* Barra de herramientas */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar estudiantes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por materia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las materias</SelectItem>
                  {uniqueCourses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DatePicker date={selectedDate} onDateChange={setSelectedDate} />
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Tomar Asistencia
              </Button>
            </div>
          </div>

          {/* Tabla de asistencia */}
          <Card>
            <CardHeader>
              <CardTitle>Registro de Asistencia - {selectedDate?.toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Materia</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Justificación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No se encontraron registros de asistencia con los criterios de búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAttendance.map((record) => (
                      <TableRow key={`${record.id}-${record.date}`}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.name} size="md" />
                            <div className="font-medium">{record.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{record.course}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            <CustomBadge variant={getStatusVariant(record.status)}>{record.status}</CustomBadge>
                          </div>
                        </TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>
                          {record.justification ? (
                            <span className="text-yellow-600">{record.justification}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              Justificar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <AttendanceChart
              data={attendanceChartData}
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

        <TabsContent value="justifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Justificaciones Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No hay justificaciones pendientes de revisión.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
