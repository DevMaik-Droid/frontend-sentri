"use client"

import { useState } from "react"
import { Search, Filter, Download, BarChart3, FileText } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { AvatarImage } from "../../atomos/avatar-image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { GradesChart } from "../../moleculas/grades-chart"
import { GradesDistributionChart } from "../../moleculas/grades-distribution-chart"
import { Progress } from "../../ui/progress"

// Datos de ejemplo para calificaciones
const gradesData = [
  {
    id: "EST001",
    name: "Ana García",
    course: "Programación OO",
    semester: "5to Semestre",
    partial1: 9.0,
    partial2: 8.5,
    partial3: 9.2,
    final: 9.5,
    average: 9.1,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST002",
    name: "Carlos Rodríguez",
    course: "Programación OO",
    semester: "3er Semestre",
    partial1: 7.5,
    partial2: 8.0,
    partial3: 7.8,
    final: 8.2,
    average: 7.9,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST003",
    name: "María López",
    course: "Programación OO",
    semester: "7mo Semestre",
    partial1: 9.5,
    partial2: 9.0,
    partial3: 9.3,
    final: 9.7,
    average: 9.4,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST004",
    name: "José Martínez",
    course: "Programación OO",
    semester: "5to Semestre",
    partial1: 6.5,
    partial2: 7.0,
    partial3: 7.5,
    final: 8.0,
    average: 7.3,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST005",
    name: "Laura Sánchez",
    course: "Cálculo Diferencial",
    semester: "1er Semestre",
    partial1: 8.5,
    partial2: 9.0,
    partial3: 9.5,
    final: 9.8,
    average: 9.2,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Datos para gráficos
const gradesChartData = [
  {
    name: "Programación OO",
    promedio: 8.4,
    minimo: 7.3,
    maximo: 9.4,
  },
  {
    name: "Cálculo",
    promedio: 7.8,
    minimo: 6.5,
    maximo: 9.2,
  },
  {
    name: "Base de Datos",
    promedio: 8.2,
    minimo: 7.0,
    maximo: 9.5,
  },
  {
    name: "Inglés",
    promedio: 8.7,
    minimo: 7.5,
    maximo: 9.8,
  },
]

const gradesDistributionData = [
  { range: "0-5.9", estudiantes: 5 },
  { range: "6.0-6.9", estudiantes: 15 },
  { range: "7.0-7.9", estudiantes: 45 },
  { range: "8.0-8.9", estudiantes: 80 },
  { range: "9.0-10", estudiantes: 35 },
]

export function StudentGradesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")

  // Filtrar calificaciones basado en búsqueda y filtros
  const filteredGrades = gradesData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCourse = selectedCourse === "all" || record.course === selectedCourse
    const matchesSemester = selectedSemester === "all" || record.semester === selectedSemester

    return matchesSearch && matchesCourse && matchesSemester
  })

  // Obtener cursos y semestres únicos para los filtros
  const uniqueCourses = Array.from(new Set(gradesData.map((record) => record.course)))
  const uniqueSemesters = Array.from(new Set(gradesData.map((record) => record.semester)))

  // Función para obtener el color según la calificación
  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-green-600"
    if (grade >= 8) return "text-blue-600"
    if (grade >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-4">
      {/* Pestañas */}
      <Tabs defaultValue="grades">
        <TabsList>
          <TabsTrigger value="grades">Calificaciones</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4 pt-4">
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
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los semestres</SelectItem>
                  {uniqueSemesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generar Reporte
              </Button>
            </div>
          </div>

          {/* Tabla de calificaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Calificaciones por Estudiante</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Materia</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead>Parcial 1</TableHead>
                    <TableHead>Parcial 2</TableHead>
                    <TableHead>Parcial 3</TableHead>
                    <TableHead>Final</TableHead>
                    <TableHead>Promedio</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        No se encontraron calificaciones con los criterios de búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGrades.map((record) => (
                      <TableRow key={`${record.id}-${record.course}`}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.name} size="md" />
                            <div className="font-medium">{record.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{record.course}</TableCell>
                        <TableCell>{record.semester}</TableCell>
                        <TableCell className={getGradeColor(record.partial1)}>{record.partial1}</TableCell>
                        <TableCell className={getGradeColor(record.partial2)}>{record.partial2}</TableCell>
                        <TableCell className={getGradeColor(record.partial3)}>{record.partial3}</TableCell>
                        <TableCell className={getGradeColor(record.final)}>{record.final}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${getGradeColor(record.average)}`}>{record.average}</span>
                            <Progress value={(record.average / 10) * 100} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm">
                              Detalles
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
            <GradesChart
              data={gradesChartData}
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

        <TabsContent value="reports" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes de Calificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Reporte de Promedios por Materia</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Boletas de Calificaciones</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Download className="h-6 w-6" />
                  <span>Exportar Calificaciones (Excel)</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Filter className="h-6 w-6" />
                  <span>Reporte de Estudiantes en Riesgo</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
