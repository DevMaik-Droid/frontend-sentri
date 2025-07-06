"use client"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  GraduationCap,
  BadgeIcon as IdCard,
  Hash,
} from "lucide-react"

import { Button } from "../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Separator } from "../../ui/separator"
import type { EstudianteCompleto } from "../../../types/estudiante/estudiante-types"


interface EstudianteInfoDialogProps {
  estudiante : EstudianteCompleto
  open : boolean
  onOpenChange : (open : boolean) => void
}

export function InfoDialog({ estudiante, open, onOpenChange  }: EstudianteInfoDialogProps) {

  const getStatusBadge = (status: string = "") => {
    switch (status) {
      case "EN_CURSO":
      case "INSCRITA":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            En Curso
          </Badge>
        )
      case "COMPLETADA":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completada
          </Badge>
        )
      case "ACTIVO":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Activo
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }
  if (!estudiante) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-gray-900">
          <User className="mr-2 h-4 w-4" />
          Ver Información del Estudiante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Información del Estudiante</DialogTitle>
          <DialogDescription>Detalles completos del perfil académico y materias inscritas</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Datos Personales</TabsTrigger>
            <TabsTrigger value="subjects">Materias</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6 overflow-y-auto max-h-[60vh]">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder.svg?height=100&width=100"
                  alt={`${estudiante.user.usuario.nombre} ${estudiante.user.usuario.apellido}`}
                />
                <AvatarFallback className="text-lg">
                  {estudiante.user.usuario.nombre}
                  {estudiante.user.usuario.apellido}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">
                    {estudiante.user.usuario.nombre} {estudiante.user.usuario.apellido}
                  </h3>
                  {getStatusBadge(estudiante.user.usuario.estado)}
                </div>
                <p className="text-muted-foreground flex items-center">
                  <Hash className="mr-2 h-4 w-4" />
                  Código: {estudiante.estudiante.codigo}
                </p>
                <p className="text-muted-foreground flex items-center">
                  <IdCard className="mr-2 h-4 w-4" />
                  CI: {estudiante.user.usuario.cedula}
                </p>
                <p className="text-muted-foreground flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {estudiante.niveles?.nombre}
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{estudiante.user.usuario.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{estudiante.user.usuario.telefono}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{estudiante.user.usuario.direccion}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Nacimiento: {estudiante.user.usuario.fecha_nacimiento}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Género: {estudiante.user.usuario.genero}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información Académica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{estudiante.niveles?.nombre}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Promedio: "N/A"</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Créditos: 
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Registro: fechacreacion</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-4 overflow-y-auto max-h-[60vh]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Materias</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-white text-gray-900">
                   materias
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Promedio: 
                </Badge>
              </div>
            </div>

            {/* <div className="grid gap-4">
              {estudiante.inscripciones.paralelo.materia?.map((materia) => (
                <Card key={materia.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{materia.nombre}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <span className="font-medium">{materia.descripcion}</span>
                          <span className="mx-2">•</span>

                          <span className="mx-2">•</span>
                          <span>{materia.nivel_id}</span>
                        </CardDescription>
                      </div>
                      {getStatusBadge()}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>docente</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Horario</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>aula</span>
                        </div>
                        {/* {materia.calificacion && (
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">Calificación: 2000</span>
                          </div>
                        )} }
                        calificacion
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
