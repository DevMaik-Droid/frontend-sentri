"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { MapPin, Users, BookOpen, Calendar, CheckCircle, GraduationCap, Trash2 } from "lucide-react"
import type { ParaleloCompleto } from "../../../types/general/general-types"
import { EstudianteService } from "../../../services/estudiante/estudiante.service"
import { useAuth } from "../../../hooks/useAuth"

// Datos simulados basados en el JSON proporcionado


interface SelectedInscripcion {
  paralelo_id: number | undefined
  materia_id: number
  materia_nombre: string
  paralelo_nombre: string
  aula: string
  cupos: number
  activo: string | undefined
  horarios: Array<{
    dia_semana: string
    hora_inicio: string
    hora_fin: string
  }>
}

export default function FrameInscripcion() {
  // ID del estudiante (ya lo tienes disponible)
  const estudiante_id = 123 // Este vendría de tu contexto/props/auth

  const [selectedMateria, setSelectedMateria] = useState<number | null>(null)
  const [selectedParalelo, setSelectedParalelo] = useState<number | null>(null)
  const [inscripciones, setInscripciones] = useState<SelectedInscripcion[]>([])

  const [materiasData, setMateriasData] = useState<ParaleloCompleto[]>([])

  const {usuario} = useAuth();
  
  useEffect(() => {
    const obtenerParalelos = async () => {
      try {
        const res = await EstudianteService.obtenerMateriasEstudiante(usuario?.estudiante?.id || 0);
        setMateriasData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    obtenerParalelos();
  }, [usuario?.estudiante?.id])


  // Obtener materias únicas
  const materias = Array.from(new Map(materiasData.map((item) => [item.materia.id, item.materia])).values())

  // Obtener paralelos para la materia seleccionada
  const paralelosDisponibles = selectedMateria
    ? Array.from(
        new Map(
          materiasData.filter((item) => item.materia.id === selectedMateria).map((item) => [item.paralelo.id, item]),
        ).values(),
      )
    : []


  const agregarInscripcion = (paraleloData: ParaleloCompleto) => {
    const horarios = materiasData
      .filter((item) => item.paralelo.id === paraleloData.paralelo.id)
      .map((item) => ({
        dia_semana: item.horario.dia_semana,
        hora_inicio: item.horario.hora_inicio,
        hora_fin: item.horario.hora_fin,
      }))

    const nuevaInscripcion: SelectedInscripcion = {
      paralelo_id: paraleloData.paralelo.id,
      materia_id: paraleloData.materia.id,
      materia_nombre: paraleloData.materia.nombre,
      paralelo_nombre: paraleloData.paralelo.nombre,
      aula: paraleloData.aula.nombre,
      cupos: paraleloData.paralelo.cupos,
      activo: paraleloData.paralelo.activo,
      horarios: horarios,
    }

    // Verificar si ya está inscrito en esta materia
    const yaInscritoEnMateria = inscripciones.some((insc) => insc.materia_id === paraleloData.materia.id)

    if (yaInscritoEnMateria) {
      // Reemplazar la inscripción existente de esta materia
      setInscripciones(
        inscripciones.map((insc) => (insc.materia_id === paraleloData.materia.id ? nuevaInscripcion : insc)),
      )
    } else {
      // Agregar nueva inscripción
      setInscripciones([...inscripciones, nuevaInscripcion])
    }

    // Limpiar selección actual
    setSelectedMateria(null)
    setSelectedParalelo(null)
  }

  const removerInscripcion = (materia_id: number) => {
    setInscripciones(inscripciones.filter((insc) => insc.materia_id !== materia_id))
  }

  const confirmarInscripcion = async () => {
    if (inscripciones.length === 0) {
      alert("Selecciona al menos una materia para inscribirte")
      return
    }

    // Datos para enviar a la base de datos
    const inscripcionesData = inscripciones.map((insc) => ({
      estudiante_id: estudiante_id,
      paralelo_id: insc.paralelo_id,
    }))

    console.log("Datos para enviar a la base de datos:", inscripcionesData)

    try {
      alert(`¡Inscripción exitosa! Se registraron ${inscripciones.length} materias.`)
      setInscripciones([])
      setSelectedMateria(null)
      setSelectedParalelo(null)
    } catch (error) {
      alert("Error al procesar la inscripción" + error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Inscripción de Materias</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecciona la materia y el paralelo que deseas cursar este semestre
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Lista de Materias */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  Materias Disponibles
                </CardTitle>
                <CardDescription className="text-base">Elige la materia que deseas cursar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {materias.map((materia) => (
                  <div
                    key={materia.id}
                    onClick={() => {
                      setSelectedMateria(materia.id)
                      setSelectedParalelo(null)
                    }}
                    className={`group p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedMateria === materia.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-blue-700">
                          {materia.nombre}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{materia.descripcion}</p>
                      </div>
                      {selectedMateria === materia.id && (
                        <div className="ml-3 bg-blue-500 rounded-full p-1">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Lista de Paralelos */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  Paralelos
                </CardTitle>
                <CardDescription className="text-base">
                  {selectedMateria
                    ? `Paralelos disponibles para ${materias.find((m) => m.id === selectedMateria)?.nombre}`
                    : "Primero selecciona una materia"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedMateria ? (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-500 mb-2">Selecciona una materia</p>
                    <p className="text-sm text-gray-400">Los paralelos aparecerán aquí</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paralelosDisponibles.map((item) => (
                      <div
                        key={item.paralelo.id}
                        onClick={() => agregarInscripcion(item)}
                        className={`group p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedParalelo === item.paralelo.id
                            ? "border-green-500 bg-green-50 shadow-md"
                            : "border-gray-200 hover:border-green-300 bg-white hover:bg-green-50/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-700">
                            Paralelo {item.paralelo.nombre}
                          </h3>
                          {selectedParalelo === item.paralelo.id && (
                            <div className="bg-green-500 rounded-full p-1">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="bg-blue-100 p-1 rounded">
                              <Users className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="font-medium">{item.paralelo.cupos} cupos disponibles</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="bg-orange-100 p-1 rounded">
                              <MapPin className="h-3 w-3 text-orange-600" />
                            </div>
                            <span className="font-medium">{item.aula.nombre}</span>
                          </div>
                          <Badge
                            variant={item.paralelo.activo === "ACTIVO" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {item.paralelo.activo}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Información Detallada y Confirmación */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  Resumen de Inscripción
                </CardTitle>
                <CardDescription className="text-base">Revisa tu selección antes de confirmar</CardDescription>
              </CardHeader>
              <CardContent>
                {inscripciones.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-500 mb-2">Sin inscripciones</p>
                    <p className="text-sm text-gray-400">Selecciona materias y paralelos</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inscripciones.map((inscripcion) => (
                      <div
                        key={inscripcion.materia_id}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{inscripcion.materia_nombre}</h3>
                            <p className="text-sm text-gray-600">
                              Paralelo {inscripcion.paralelo_nombre} - {inscripcion.aula}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removerInscripcion(inscripcion.materia_id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-3 w-3 text-blue-500" />
                            <span>{inscripcion.cupos} cupos</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {inscripcion.horarios.map((horario, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded text-sm">
                              <span className="font-medium">{horario.dia_semana}</span>
                              <span className="text-gray-600">
                                {horario.hora_inicio} - {horario.hora_fin}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <Button onClick={confirmarInscripcion} size="lg" className="w-full text-lg py-6">
                      Confirmar {inscripciones.length} Inscripción{inscripciones.length !== 1 ? "es" : ""}
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
