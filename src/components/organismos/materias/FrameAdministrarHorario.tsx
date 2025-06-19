import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Clock,
  Edit,
  Eye,
  MapPin,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";

const mockSchedules = [
  {
    id: "1",
    parallel: "Paralelo A - Ingeniería",
    classroom: "Aula 101",
    capacity: 40,
    status: "Confirmado",
    blocks: [
      {
        startTime: "08:00",
        endTime: "10:00",
        days: ["monday", "wednesday"],
        subject: "Matemáticas I",
      },
      {
        startTime: "10:00",
        endTime: "12:00",
        days: ["tuesday", "thursday"],
        subject: "Física I",
      },
    ],
  },
  {
    id: "2",
    parallel: "Paralelo B - Ingeniería",
    classroom: "Aula 102",
    capacity: 35,
    status: "Pendiente",
    blocks: [
      {
        startTime: "14:00",
        endTime: "16:00",
        days: ["monday", "friday"],
        subject: "Programación I",
      },
      {
        startTime: "16:00",
        endTime: "18:00",
        days: ["wednesday"],
        subject: "Álgebra Lineal",
      },
    ],
  },
];

const daysMap = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
};

export default function FrameAdministrarHorario() {
  const [schedules, setSchedules] = useState(mockSchedules);

  const [editingSchedule, setEditingSchedule] = useState<any>(null);

  const [viewingSchedule, setViewingSchedule] = useState<any>(null);

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800";
      case "Inactivo":
        return "bg-red-100 text-red-800";
      case "Confirmado":
        return "bg-blue-100 text-blue-800";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid gap-4">
      {/* Lista de horarios */}
      <div className="grid gap-4">
        {schedules.map((schedule) => (
          <Card
            key={schedule.id}
            className="border-slate-200 hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {schedule.parallel}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {schedule.classroom}
                      </span>
                      <span>Capacidad: {schedule.capacity}</span>
                      <Badge className={getStatusColor(schedule.status)}>
                        {schedule.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setViewingSchedule(schedule)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setEditingSchedule(schedule)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => deleteSchedule(schedule.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar horario?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará permanentemente el horario de "
                          {schedule.parallel}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteSchedule(schedule.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">
                  Bloques de horario:
                </h4>
                <div className="grid gap-2">
                  {schedule.blocks.map((block, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-50 p-3 rounded"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium text-emerald-600">
                          {block.startTime} - {block.endTime}
                        </div>
                        <div className="text-sm text-slate-600">
                          {block.subject}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {block.days.map((dayId) => (
                          <Badge
                            key={dayId}
                            variant="secondary"
                            className="text-xs"
                          >
                            {daysMap[dayId as keyof typeof daysMap]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de edición de horario */}
      <Dialog
        open={!!editingSchedule}
        onOpenChange={() => setEditingSchedule(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Horario</DialogTitle>
            <DialogDescription>
              Modifica la información del horario seleccionado.
            </DialogDescription>
          </DialogHeader>
          {editingSchedule && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Paralelo</Label>
                  <Select defaultValue={editingSchedule.parallel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paralelo A - Ingeniería">
                        Paralelo A - Ingeniería
                      </SelectItem>
                      <SelectItem value="Paralelo B - Ingeniería">
                        Paralelo B - Ingeniería
                      </SelectItem>
                      <SelectItem value="Paralelo C - Medicina">
                        Paralelo C - Medicina
                      </SelectItem>
                      <SelectItem value="Paralelo D - Derecho">
                        Paralelo D - Derecho
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Aula</Label>
                  <Select defaultValue={editingSchedule.classroom}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aula 101">Aula 101</SelectItem>
                      <SelectItem value="Aula 102">Aula 102</SelectItem>
                      <SelectItem value="Aula 201">Aula 201</SelectItem>
                      <SelectItem value="Aula 202">Aula 202</SelectItem>
                      <SelectItem value="Laboratorio A">
                        Laboratorio A
                      </SelectItem>
                      <SelectItem value="Laboratorio B">
                        Laboratorio B
                      </SelectItem>
                      <SelectItem value="Auditorio Principal">
                        Auditorio Principal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select defaultValue={editingSchedule.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Confirmado">Confirmado</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Capacidad del Aula</Label>
                <Input
                  type="number"
                  defaultValue={editingSchedule.capacity}
                  className="w-32"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">
                    Bloques de Horario
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newBlock = {
                        startTime: "08:00",
                        endTime: "10:00",
                        days: ["monday"],
                        subject: "Nueva Materia",
                      };
                      setEditingSchedule({
                        ...editingSchedule,
                        blocks: [...editingSchedule.blocks, newBlock],
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Bloque
                  </Button>
                </div>

                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {editingSchedule.blocks.map((block: any, index: number) => (
                    <Card key={index} className="p-4 bg-slate-50">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Bloque {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => {
                              const updatedBlocks =
                                editingSchedule.blocks.filter(
                                  (_: any, i: number) => i !== index
                                );
                              setEditingSchedule({
                                ...editingSchedule,
                                blocks: updatedBlocks,
                              });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Hora de Inicio</Label>
                            <Input
                              type="time"
                              defaultValue={block.startTime}
                              onChange={(e) => {
                                const updatedBlocks = [
                                  ...editingSchedule.blocks,
                                ];
                                updatedBlocks[index].startTime = e.target.value;
                                setEditingSchedule({
                                  ...editingSchedule,
                                  blocks: updatedBlocks,
                                });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Hora de Fin</Label>
                            <Input
                              type="time"
                              defaultValue={block.endTime}
                              onChange={(e) => {
                                const updatedBlocks = [
                                  ...editingSchedule.blocks,
                                ];
                                updatedBlocks[index].endTime = e.target.value;
                                setEditingSchedule({
                                  ...editingSchedule,
                                  blocks: updatedBlocks,
                                });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Materia</Label>
                            <Input
                              defaultValue={block.subject}
                              onChange={(e) => {
                                const updatedBlocks = [
                                  ...editingSchedule.blocks,
                                ];
                                updatedBlocks[index].subject = e.target.value;
                                setEditingSchedule({
                                  ...editingSchedule,
                                  blocks: updatedBlocks,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Días de la Semana</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(daysMap).map(([dayId, dayName]) => (
                              <div
                                key={dayId}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${index}-${dayId}`}
                                  checked={block.days.includes(dayId)}
                                  onCheckedChange={(checked) => {
                                    const updatedBlocks = [
                                      ...editingSchedule.blocks,
                                    ];
                                    if (checked) {
                                      updatedBlocks[index].days = [
                                        ...updatedBlocks[index].days,
                                        dayId,
                                      ];
                                    } else {
                                      updatedBlocks[index].days = updatedBlocks[
                                        index
                                      ].days.filter((d: string) => d !== dayId);
                                    }
                                    setEditingSchedule({
                                      ...editingSchedule,
                                      blocks: updatedBlocks,
                                    });
                                  }}
                                />
                                <Label
                                  htmlFor={`${index}-${dayId}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {dayName}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSchedule(null)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                // Aquí iría la lógica para guardar los cambios
                console.log("Guardando horario:", editingSchedule);
                setEditingSchedule(null);
              }}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de vista detallada de horario */}
      <Dialog
        open={!!viewingSchedule}
        onOpenChange={() => setViewingSchedule(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles del Horario</DialogTitle>
            <DialogDescription>
              Información completa del horario seleccionado.
            </DialogDescription>
          </DialogHeader>
          {viewingSchedule && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      Información General
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Paralelo:</span>
                      <span className="font-medium">
                        {viewingSchedule.parallel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Aula:</span>
                      <span className="font-medium">
                        {viewingSchedule.classroom}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Capacidad:</span>
                      <span className="font-medium">
                        {viewingSchedule.capacity} estudiantes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estado:</span>
                      <Badge className={getStatusColor(viewingSchedule.status)}>
                        {viewingSchedule.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Bloques:</span>
                      <span className="font-medium">
                        {viewingSchedule.blocks.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Horas Semanales:</span>
                      <span className="font-medium">
                        {viewingSchedule.blocks.reduce(
                          (total: number, block: any) => {
                            const start = new Date(
                              `2000-01-01T${block.startTime}`
                            );
                            const end = new Date(`2000-01-01T${block.endTime}`);
                            const hours =
                              (end.getTime() - start.getTime()) /
                              (1000 * 60 * 60);
                            return total + hours * block.days.length;
                          },
                          0
                        )}{" "}
                        horas
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Días Activos:</span>
                      <span className="font-medium">
                        {
                          [
                            ...new Set(
                              viewingSchedule.blocks.flatMap(
                                (block: any) => block.days
                              )
                            ),
                          ].length
                        }{" "}
                        días
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Horario Detallado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {viewingSchedule.blocks.map((block: any, index: number) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="bg-emerald-100 text-emerald-800"
                            >
                              Bloque {index + 1}
                            </Badge>
                            <span className="font-medium text-emerald-600">
                              {block.startTime} - {block.endTime}
                            </span>
                          </div>
                          <span className="text-sm text-slate-600">
                            {block.subject}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {block.days.map((dayId: string) => (
                            <Badge
                              key={dayId}
                              variant="secondary"
                              className="text-xs"
                            >
                              {daysMap[dayId as keyof typeof daysMap]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewingSchedule(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
