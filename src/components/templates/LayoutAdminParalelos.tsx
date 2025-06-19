"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import {
  Users,
  Clock,
  MapPin,
  Download,
  BarChart3,
  FileText,
} from "lucide-react"
import FrameAdministrarParalelos from "../organismos/materias/FrameAdministrarParalelos"
import FrameAdministrarHorario from "../organismos/materias/FrameAdministrarHorario"

export default function AdminParalelos() {

  const exportData = () => {

    // const data = filteredParallels.map((p) => ({
    //   Nombre: p.name,
    //   Gestión: p.gestion,
    //   Estudiantes: p.students,
    //   Estado: p.status,
    //   Materias: p.assignments.length,
    // }))
    console.log("Exportando datos:")
    // Aquí iría la lógica de exportación
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Panel de Administración</h1>
              <p className="text-slate-600">Gestiona todos los paralelos y horarios del sistema</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={exportData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={() => console.log("Generar reporte")}>
              <FileText className="w-4 h-4 mr-2" />
              Reporte
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Paralelos</p>
                  <p className="text-2xl font-bold">100</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Estudiantes</p>
                  <p className="text-2xl font-bold">50</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Horarios</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Activos</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="parallels" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parallels">Paralelos</TabsTrigger>
            <TabsTrigger value="schedules">Horarios</TabsTrigger>
          </TabsList>

          <TabsContent value="parallels" className="space-y-4">
            <FrameAdministrarParalelos></FrameAdministrarParalelos>
          </TabsContent>

          <TabsContent value="schedules" className="space-y-4">
            <FrameAdministrarHorario></FrameAdministrarHorario>
          </TabsContent>
        </Tabs>

  
        
      </div>
    </div>
  )
}
