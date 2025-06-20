"use client"

import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Checkbox } from "../../ui/checkbox"
import { Clock, Plus, Trash2, Users, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import type { Aula, GetParalelo, Horario, Niveles } from "../../../types/general/general-types"
import { GeneralService } from "../../../services/general.service"
import toast, { Toaster } from "react-hot-toast"

const daysOfWeek = [
  { id: "Lunes", label: "Lunes", short: "Lun" },
  { id: "Martes", label: "Martes", short: "Mar" },
  { id: "Miercoles", label: "Miércoles", short: "Mie" },
  { id: "Jueves", label: "Jueves", short: "Jue" },
  { id: "Viernes", label: "Viernes", short: "Vie" },
  { id: "Sabado", label: "Sábado", short: "Sab" },
]

export default function FrameCrearHorario() {
  const [horaInicio, setHoraInicio] = useState("")
  const [horaFin, setHoraFin] = useState("")
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([])
  const [bloquesHorarios, setBloquesHorarios] = useState<Horario[]>([])
  const [paraleloSeleccionado, setParaleloSeleccionado] = useState("")
  const [aulaSeleccionada, setAulaSeleccionada] = useState("")
  const [nivelSeleccionado, setNivelSeleccionado] = useState("")

  const [paralelos, setParalelos] = useState<Array<GetParalelo>>([])
  const [aulas, setAulas] = useState<Array<Aula>>([])
  const [niveles, setNiveles] = useState<Array<Niveles>>([])

  useEffect(() => {
    const obtenerNiveles = async () => {
      try {
        const res = await GeneralService.getNiveles();
        setNiveles(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    const obtener_paralelos = async () => {
      try {
        const res = await GeneralService.getParalelos();
        setParalelos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const obtener_aulas = async () => {
      try {
        const res = await GeneralService.getAulas();
        setAulas(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    obtenerNiveles();
    obtener_paralelos();
    obtener_aulas();

  }, [])

  const handleDayToggle = (dayId: string) => {
    setDiasSeleccionados((prev) => (prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]))
  }

  const addScheduleBlock = () => {
    if (horaInicio && horaFin && diasSeleccionados.length > 0 && paraleloSeleccionado && aulaSeleccionada) {
      const bloqueHorario : Horario = {
        dias_semana: diasSeleccionados,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        paralelo_id: Number(paraleloSeleccionado),
        aula_id: Number(aulaSeleccionada)
      }
      setBloquesHorarios([...bloquesHorarios, bloqueHorario])

      // Reset form
      setHoraInicio("")
      setHoraFin("")
      setDiasSeleccionados([])
      setParaleloSeleccionado("")
      setAulaSeleccionada("")
    }
  }
  const paralelosFiltrados = paralelos.filter((paralelo) => paralelo.nivel_id === Number(nivelSeleccionado))
  .sort((paraleloA, paraleloB) => paraleloA.materia.localeCompare(paraleloB.materia));

  const removeScheduleBlock = (id: number) => {
    setBloquesHorarios(bloquesHorarios.filter((_, index) => index !== id))
  }

  const getDayLabel = (dayId: string) => {
    return daysOfWeek.find((d) => d.id === dayId)?.short || dayId
  }

  const handleSubmit = async () => {
    console.log(bloquesHorarios)
    // Aquí iría la lógica para guardar el horario

    try{
      const response = await GeneralService.crearHorario(bloquesHorarios);
      console.log(response);
      if (response.result === "ok") {
        toast.success(response.message);
        setBloquesHorarios([]);
      }else{
        toast.error(response.message);
      }
      
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="space-y-6">
      <Toaster></Toaster>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Nivel
          </Label>
          <Select value={nivelSeleccionado} onValueChange={setNivelSeleccionado}>
            <SelectTrigger className="border-slate-300 focus:border-emerald-500">
              <SelectValue placeholder="Seleccionar nivel" />
            </SelectTrigger>
            <SelectContent>
              {niveles.map((nivel) => (
                <SelectItem key={nivel.id} value={String(nivel.id)}>
                  {nivel.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Paralelo
          </Label>
          <Select value={paraleloSeleccionado} onValueChange={setParaleloSeleccionado}>
            <SelectTrigger className="border-slate-300 focus:border-emerald-500">
              <SelectValue placeholder="Seleccionar paralelo" />
            </SelectTrigger>
            <SelectContent>
              {paralelosFiltrados.map((paralelo) => (
                <SelectItem key={paralelo.id} value={String(paralelo.id)}>
                  <div className="flex flex-row gap-4">
                    <p className="font-medium text-sm leading-none ">{paralelo.paralelo}</p>
                    <p className="text-xs text-muted-foreground">{paralelo.materia}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Aula
          </Label>
          <Select value={aulaSeleccionada} onValueChange={setAulaSeleccionada}>
            <SelectTrigger className="border-slate-300 focus:border-emerald-500">
              <SelectValue placeholder="Seleccionar aula" />
            </SelectTrigger>
            <SelectContent>
              {aulas?.map((aula) => (
                <SelectItem key={aula.id} value={String(aula.id)}>
                  {aula.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-slate-50 border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Agregar Bloque de Horario
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora de Inicio
              </Label>
              <Input
                type="time"
                min={"08:00"}
                max={"22:30"}
                step={900}
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="border-slate-300 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora de Fin
              </Label>
              <Input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="border-slate-300 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm">Días de la Semana</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {daysOfWeek.map((day) => (
                <div key={day.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={day.id}
                    checked={diasSeleccionados.includes(day.id)}
                    onCheckedChange={() => handleDayToggle(day.id)}
                    className="border-slate-300"
                  />
                  <Label htmlFor={day.id} className="text-sm font-normal cursor-pointer">
                    {day.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={addScheduleBlock}
            disabled={!horaInicio || !horaFin || diasSeleccionados.length === 0 || !paraleloSeleccionado || !aulaSeleccionada}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Bloque
          </Button>
        </CardContent>
      </Card>

      {bloquesHorarios.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Lista de Horarios a Registrar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bloquesHorarios.map((block, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-emerald-600">
                        <p>Hora:</p>
                        {block.hora_inicio} - {block.hora_fin}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-slate-600 w-full" >
                        <div className="flex gap-5">
                          <p>Materia: <strong> {paralelosFiltrados.find((p) => p.id === block.paralelo_id)?.materia} </strong></p>
                          <p>Paralelo: <strong>{paralelos.find((p) => p.id === block.paralelo_id)?.paralelo} </strong> </p>
                          <p>Aula: <strong> {aulas.find((a) => a.id === block.aula_id)?.nombre}</strong></p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <p>Días:</p>
                        {block.dias_semana.map((dayId) => (
                          <Badge key={dayId} variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                            {getDayLabel(dayId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeScheduleBlock(index)}
                    className="text-red-500 hover:text-red-50 hover:bg-red-700 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={bloquesHorarios.length === 0}
          className="bg-emerald-500 hover:bg-emerald-600 px-8"
        >
          Crear Horario
        </Button>
      </div>
    </div>
  )
}
