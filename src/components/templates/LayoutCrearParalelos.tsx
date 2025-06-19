"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Users, Clock } from "lucide-react"
import FrameCrearParalelo from "../organismos/materias/FrameCrearParalelo"
import FrameCrearHorario from "../organismos/materias/FrameCrearHorario"


export default function LayoutCrearParalelos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Gestión Académica</h1>
          <p className="text-slate-600">Administra paralelos y horarios de manera eficiente</p>
        </div>

        <Tabs defaultValue="paralelos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="paralelos" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Crear Paralelos
            </TabsTrigger>
            <TabsTrigger value="horarios" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Crear Horarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paralelos">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-4">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Crear Nuevo Paralelo
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Configura las materias, gestión y docentes para el paralelo
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <FrameCrearParalelo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="horarios">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Crear Nuevo Horario
                </CardTitle>
                <CardDescription className="text-emerald-100">Define los horarios y días de clases</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <FrameCrearHorario />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
