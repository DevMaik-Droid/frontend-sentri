"use client"
import { useState } from "react"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Separator } from "../../ui/separator"
import { BookOpen, Clock, Users, AlertCircle, CheckCircle2 } from "lucide-react"

// Datos de ejemplo de materias
const subjects = {
  1: [
    {
      id: "MAT101",
      name: "Matemáticas I",
      credits: 4,
      schedule: "Lun-Mie-Vie 8:00-9:30",
      professor: "Dr. García López",
      capacity: 30,
      enrolled: 25,
      prerequisites: [],
      description: "Fundamentos de álgebra y cálculo diferencial",
    },
    {
      id: "FIS101",
      name: "Física I",
      credits: 4,
      schedule: "Mar-Jue 10:00-11:30",
      professor: "Dra. Martínez Silva",
      capacity: 25,
      enrolled: 20,
      prerequisites: [],
      description: "Mecánica clásica y principios fundamentales",
    },
    {
      id: "QUI101",
      name: "Química General",
      credits: 3,
      schedule: "Lun-Mie 14:00-15:30",
      professor: "Dr. Rodríguez Pérez",
      capacity: 35,
      enrolled: 30,
      prerequisites: [],
      description: "Principios básicos de química inorgánica y orgánica",
    },
    {
      id: "ING101",
      name: "Inglés I",
      credits: 2,
      schedule: "Mar-Jue 16:00-17:00",
      professor: "Prof. Johnson Smith",
      capacity: 20,
      enrolled: 18,
      prerequisites: [],
      description: "Inglés básico para ingeniería",
    },
  ],
  2: [
    {
      id: "MAT201",
      name: "Matemáticas II",
      credits: 4,
      schedule: "Lun-Mie-Vie 9:00-10:30",
      professor: "Dr. García López",
      capacity: 30,
      enrolled: 22,
      prerequisites: ["MAT101"],
      description: "Cálculo integral y ecuaciones diferenciales",
    },
    {
      id: "FIS201",
      name: "Física II",
      credits: 4,
      schedule: "Mar-Jue 11:00-12:30",
      professor: "Dra. Martínez Silva",
      capacity: 25,
      enrolled: 19,
      prerequisites: ["FIS101", "MAT101"],
      description: "Electromagnetismo y ondas",
    },
    {
      id: "PRO201",
      name: "Programación I",
      credits: 3,
      schedule: "Lun-Mie 15:00-16:30",
      professor: "Ing. López Hernández",
      capacity: 30,
      enrolled: 28,
      prerequisites: [],
      description: "Fundamentos de programación en Python",
    },
    {
      id: "ING201",
      name: "Inglés II",
      credits: 2,
      schedule: "Mar-Jue 17:00-18:00",
      professor: "Prof. Johnson Smith",
      capacity: 20,
      enrolled: 15,
      prerequisites: ["ING101"],
      description: "Inglés intermedio para ingeniería",
    },
  ],
  3: [
    {
      id: "MAT301",
      name: "Matemáticas III",
      credits: 4,
      schedule: "Lun-Mie-Vie 10:00-11:30",
      professor: "Dr. Fernández Castro",
      capacity: 25,
      enrolled: 20,
      prerequisites: ["MAT201"],
      description: "Cálculo multivariable y análisis vectorial",
    },
    {
      id: "PRO301",
      name: "Programación II",
      credits: 4,
      schedule: "Mar-Jue 13:00-14:30",
      professor: "Ing. López Hernández",
      capacity: 25,
      enrolled: 23,
      prerequisites: ["PRO201"],
      description: "Programación orientada a objetos y estructuras de datos",
    },
    {
      id: "EST301",
      name: "Estadística",
      credits: 3,
      schedule: "Lun-Mie 16:00-17:30",
      professor: "Dra. Morales Ruiz",
      capacity: 30,
      enrolled: 25,
      prerequisites: ["MAT201"],
      description: "Estadística descriptiva e inferencial",
    },
    {
      id: "BDD301",
      name: "Base de Datos",
      credits: 3,
      schedule: "Vie 14:00-17:00",
      professor: "Ing. Vargas Mendoza",
      capacity: 20,
      enrolled: 18,
      prerequisites: ["PRO201"],
      description: "Diseño y administración de bases de datos relacionales",
    },
  ],
}

export default function FrameRegistrarMateria() {
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [totalCredits, setTotalCredits] = useState(0)

  const handleSubjectToggle = (subjectId: string, credits: number) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId))
      setTotalCredits(totalCredits - credits)
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId])
      setTotalCredits(totalCredits + credits)
    }
  }

  const currentSubjects = selectedLevel ? subjects[selectedLevel as keyof typeof subjects] || [] : []

  const handleRegister = () => {
    if (selectedSubjects.length === 0) {
      alert("Por favor selecciona al menos una materia")
      return
    }
    alert(
      `Registro exitoso! Has seleccionado ${selectedSubjects.length} materias con un total de ${totalCredits} créditos.`,
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Registro de Materias</h1>
          <p className="text-lg text-gray-600">Selecciona las materias correspondientes a tu nivel académico</p>
        </div>

        {/* Level Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Selecciona tu Nivel Académico
            </CardTitle>
            <CardDescription>Elige tu semestre actual para ver las materias disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Selecciona tu semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1er Semestre</SelectItem>
                <SelectItem value="2">2do Semestre</SelectItem>
                <SelectItem value="3">3er Semestre</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Subjects List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Materias Disponibles</CardTitle>
                <CardDescription>
                  {selectedLevel
                    ? `Materias para ${selectedLevel}er semestre`
                    : "Selecciona un nivel para ver las materias"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedLevel ? (
                  <div className="text-center py-12 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Selecciona tu nivel académico para ver las materias disponibles</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentSubjects.map((subject) => {
                      const isSelected = selectedSubjects.includes(subject.id)
                      const isFull = subject.enrolled >= subject.capacity
                      const availableSpots = subject.capacity - subject.enrolled

                      return (
                        <div
                          key={subject.id}
                          className={`border rounded-lg p-4 transition-all ${
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : isFull
                                ? "border-red-200 bg-red-50"
                                : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Checkbox
                                id={subject.id}
                                checked={isSelected}
                                disabled={isFull && !isSelected}
                                onCheckedChange={() => handleSubjectToggle(subject.id, subject.credits)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{subject.name}</h3>
                                  <Badge variant="secondary">{subject.id}</Badge>
                                  <Badge variant="outline">{subject.credits} créditos</Badge>
                                </div>

                                <p className="text-gray-600 mb-3">{subject.description}</p>

                                <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {subject.schedule}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {subject.enrolled}/{subject.capacity} estudiantes
                                  </div>
                                </div>

                                <p className="text-sm text-gray-500 mt-1">Profesor: {subject.professor}</p>

                                {subject.prerequisites.length > 0 && (
                                  <div className="mt-2">
                                    <span className="text-sm text-gray-500">Prerrequisitos: </span>
                                    {subject.prerequisites.map((prereq, index) => (
                                      <Badge key={prereq} variant="outline" className="text-xs mr-1">
                                        {prereq}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="text-right">
                              {isFull ? (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Lleno
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {availableSpots} disponibles
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Registration Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen de Registro</CardTitle>
                <CardDescription>Materias seleccionadas</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSubjects.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No has seleccionado ninguna materia</p>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {selectedSubjects.map((subjectId) => {
                        const subject = currentSubjects.find((s) => s.id === subjectId)
                        if (!subject) return null

                        return (
                          <div key={subjectId} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{subject.name}</p>
                              <p className="text-xs text-gray-500">{subject.id}</p>
                            </div>
                            <Badge variant="secondary">{subject.credits}</Badge>
                          </div>
                        )
                      })}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center font-semibold">
                      <span>Total de Créditos:</span>
                      <span className="text-lg">{totalCredits}</span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>Materias seleccionadas: {selectedSubjects.length}</p>
                      <p className="mt-1">
                        {totalCredits < 12 && "⚠️ Mínimo recomendado: 12 créditos"}
                        {totalCredits > 20 && "⚠️ Máximo recomendado: 20 créditos"}
                        {totalCredits >= 12 && totalCredits <= 20 && "✅ Carga académica adecuada"}
                      </p>
                    </div>

                    <Button onClick={handleRegister} className="w-full" disabled={selectedSubjects.length === 0}>
                      Confirmar Registro
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
