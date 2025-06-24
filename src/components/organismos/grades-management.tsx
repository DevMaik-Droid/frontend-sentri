"use client"

import { useState } from "react"
import { Save, Download, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { AvatarImageCustom } from "../atomos/avatar-image"
import { CustomBadge } from "../atomos/custom-badge"

const gradesData = [
  {
    id: "EST001",
    name: "Ana García",
    avatar: "/placeholder.svg?height=32&width=32",
    parcial1: 8.5,
    parcial2: 9.0,
    parcial3: 8.8,
    final: 0,
    promedio: 8.77,
  },
  {
    id: "EST002",
    name: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=32&width=32",
    parcial1: 7.5,
    parcial2: 8.2,
    parcial3: 7.8,
    final: 0,
    promedio: 7.83,
  },
  {
    id: "EST003",
    name: "María López",
    avatar: "/placeholder.svg?height=32&width=32",
    parcial1: 9.2,
    parcial2: 9.5,
    parcial3: 9.0,
    final: 0,
    promedio: 9.23,
  },
  {
    id: "EST004",
    name: "José Martínez",
    avatar: "/placeholder.svg?height=32&width=32",
    parcial1: 6.5,
    parcial2: 7.0,
    parcial3: 6.8,
    final: 0,
    promedio: 6.77,
  },
  {
    id: "EST005",
    name: "Laura Sánchez",
    avatar: "/placeholder.svg?height=32&width=32",
    parcial1: 9.8,
    parcial2: 9.6,
    parcial3: 9.9,
    final: 0,
    promedio: 9.77,
  },
]

export function GradesManagement() {
  const [selectedSubject, setSelectedSubject] = useState("poo")
  const [selectedGroup, setSelectedGroup] = useState("A")
  const [grades, setGrades] = useState(gradesData)

  const updateGrade = (studentId: string, field: string, value: number) => {
    setGrades((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          const updated = { ...student, [field]: value }
          // Recalcular promedio
          const parciales = [updated.parcial1, updated.parcial2, updated.parcial3].filter((g) => g > 0)
          updated.promedio = parciales.length > 0 ? parciales.reduce((a, b) => a + b, 0) / parciales.length : 0
          return updated
        }
        return student
      }),
    )
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-green-600"
    if (grade >= 7) return "text-blue-600"
    if (grade >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestión de Calificaciones</CardTitle>
            <CardDescription>Captura y edición de calificaciones por materia y grupo</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Materia:</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poo">Programación OO</SelectItem>
                <SelectItem value="ed">Estructuras de Datos</SelectItem>
                <SelectItem value="is">Ingeniería de Software</SelectItem>
                <SelectItem value="bd">Base de Datos</SelectItem>
                <SelectItem value="tp">Taller de Programación</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Grupo:</label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Grupo A</SelectItem>
                <SelectItem value="B">Grupo B</SelectItem>
                <SelectItem value="C">Grupo C</SelectItem>
                <SelectItem value="D">Grupo D</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead className="text-center">Parcial 1</TableHead>
              <TableHead className="text-center">Parcial 2</TableHead>
              <TableHead className="text-center">Parcial 3</TableHead>
              <TableHead className="text-center">Final</TableHead>
              <TableHead className="text-center">Promedio</TableHead>
              <TableHead className="text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <AvatarImageCustom src={student.avatar || "/placeholder.svg"} alt={student.name} size="md" />
                    <div className="font-medium">{student.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={student.parcial1 || ""}
                    onChange={(e) => updateGrade(student.id, "parcial1", Number.parseFloat(e.target.value) || 0)}
                    className="w-20 text-center"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={student.parcial2 || ""}
                    onChange={(e) => updateGrade(student.id, "parcial2", Number.parseFloat(e.target.value) || 0)}
                    className="w-20 text-center"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={student.parcial3 || ""}
                    onChange={(e) => updateGrade(student.id, "parcial3", Number.parseFloat(e.target.value) || 0)}
                    className="w-20 text-center"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={student.final || ""}
                    onChange={(e) => updateGrade(student.id, "final", Number.parseFloat(e.target.value) || 0)}
                    className="w-20 text-center"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <span className={`font-semibold ${getGradeColor(student.promedio)}`}>
                    {student.promedio.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <CustomBadge
                    variant={
                      student.promedio >= 8
                        ? "default"
                        : student.promedio >= 6
                          ? "secondary"
                          : student.promedio > 0
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {student.promedio >= 8
                      ? "Excelente"
                      : student.promedio >= 6
                        ? "Aprobado"
                        : student.promedio > 0
                          ? "Reprobado"
                          : "Sin calificar"}
                  </CustomBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
