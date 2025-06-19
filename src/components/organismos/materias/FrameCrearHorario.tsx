"use client"

import { useState } from "react"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Checkbox } from "../../ui/checkbox"
import { Clock, Plus, Trash2, Users, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

const daysOfWeek = [
  { id: "monday", label: "Lunes", short: "L" },
  { id: "tuesday", label: "Martes", short: "M" },
  { id: "wednesday", label: "Miércoles", short: "X" },
  { id: "thursday", label: "Jueves", short: "J" },
  { id: "friday", label: "Viernes", short: "V" },
  { id: "saturday", label: "Sábado", short: "S" },
]

const mockParallels = [
  "Paralelo A - Ingeniería",
  "Paralelo B - Ingeniería",
  "Paralelo C - Medicina",
  "Paralelo D - Derecho",
  "Paralelo A - Arquitectura",
]

const mockClassrooms = [
  "Aula 101",
  "Aula 102",
  "Aula 201",
  "Aula 202",
  "Laboratorio A",
  "Laboratorio B",
  "Auditorio Principal",
]

interface ScheduleBlock {
  id: string
  startTime: string
  endTime: string
  days: string[]
  parallel: string
  classroom: string
}

export default function FrameCrearHorario() {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [scheduleBlocks, setScheduleBlocks] = useState<ScheduleBlock[]>([])
  const [selectedParallel, setSelectedParallel] = useState("")
  const [selectedClassroom, setSelectedClassroom] = useState("")

  const handleDayToggle = (dayId: string) => {
    setSelectedDays((prev) => (prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]))
  }

  const addScheduleBlock = () => {
    if (startTime && endTime && selectedDays.length > 0 && selectedParallel && selectedClassroom) {
      const newBlock: ScheduleBlock = {
        id: Date.now().toString(),
        startTime,
        endTime,
        days: [...selectedDays],
        parallel: selectedParallel,
        classroom: selectedClassroom,
      }
      setScheduleBlocks([...scheduleBlocks, newBlock])

      // Reset form
      setStartTime("")
      setEndTime("")
      setSelectedDays([])
      setSelectedParallel("")
      setSelectedClassroom("")
    }
  }

  const removeScheduleBlock = (id: string) => {
    setScheduleBlocks(scheduleBlocks.filter((block) => block.id !== id))
  }

  const getDayLabel = (dayId: string) => {
    return daysOfWeek.find((d) => d.id === dayId)?.short || dayId
  }

  const handleSubmit = () => {
    console.log({
      parallel: selectedParallel,
      classroom: selectedClassroom,
      scheduleBlocks,
    })
    // Aquí iría la lógica para guardar el horario
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Paralelo
          </Label>
          <Select value={selectedParallel} onValueChange={setSelectedParallel}>
            <SelectTrigger className="border-slate-300 focus:border-emerald-500">
              <SelectValue placeholder="Seleccionar paralelo" />
            </SelectTrigger>
            <SelectContent>
              {mockParallels.map((parallel) => (
                <SelectItem key={parallel} value={parallel}>
                  {parallel}
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
          <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
            <SelectTrigger className="border-slate-300 focus:border-emerald-500">
              <SelectValue placeholder="Seleccionar aula" />
            </SelectTrigger>
            <SelectContent>
              {mockClassrooms.map((classroom) => (
                <SelectItem key={classroom} value={classroom}>
                  {classroom}
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
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
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
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
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
                    checked={selectedDays.includes(day.id)}
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
            disabled={!startTime || !endTime || selectedDays.length === 0 || !selectedParallel || !selectedClassroom}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Bloque
          </Button>
        </CardContent>
      </Card>

      {scheduleBlocks.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa del Horario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleBlocks.map((block) => (
                <div
                  key={block.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-emerald-600">
                        {block.startTime} - {block.endTime}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-slate-600">
                        {block.parallel} • {block.classroom}
                      </div>
                      <div className="flex gap-1">
                        {block.days.map((dayId) => (
                          <Badge key={dayId} variant="secondary" className="text-xs bg-emerald-100 text-emerald-800">
                            {getDayLabel(dayId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeScheduleBlock(block.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
          disabled={!selectedParallel || !selectedClassroom || scheduleBlocks.length === 0}
          className="bg-emerald-500 hover:bg-emerald-600 px-8"
        >
          Crear Horario
        </Button>
      </div>
    </div>
  )
}
