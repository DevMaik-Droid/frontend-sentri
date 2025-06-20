"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Plus, X, Calendar, User, University, Users2 } from "lucide-react";
import { GeneralService } from "../../../services/general.service";
import type {
  Materias,
  Niveles,
  Paralelo,
} from "../../../types/general/general-types";
import toast, { Toaster } from "react-hot-toast";

const mockTeachers = [
  { id: 1, name: "Dr. María González" },
  { id: 2, name: "Ing. Carlos Rodríguez" },
  { id: 3, name: "Lic. Ana Martínez" },
  { id: 4, name: "Dr. Pedro Sánchez" },
  { id: 5, name: "Ing. Laura López" },
  { id: 6, name: "Lic. José Hernández" },
];

const mockGestions = [{ id: 1, name: "2025-I" }];

export default function FrameCrearParalelo() {
  const [parallelName, setParallelName] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");
  const [docenteSeleccionado, setDocenteSeleccionado] = useState("");
  const [cupos, setCupos] = useState("");
  const [assignments, setAssignments] = useState<Array<Paralelo>>([]);

  const [nivelSeleccionado, setNivelSeleccionado] = useState("");

  const [materias, setMaterias] = useState<Materias[]>([]);
  const [niveles, setNiveles] = useState<Niveles[]>([]);

  // cargar materias, niveles
  useEffect(() => {
    const obtener_materias = async () => {
      try {
        const res = await GeneralService.getMaterias();
        setMaterias(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const obtener_niveles = async () => {
      try {
        const res = await GeneralService.getNiveles();
        setNiveles(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    obtener_niveles();
    obtener_materias();
  }, []);

  const addAssignment = () => {
    if (materiaSeleccionada && docenteSeleccionado && gestionSeleccionada) {
      setAssignments([
        ...assignments,
        {
          nombre: parallelName,
          materia_id: Number(materiaSeleccionada),
          docente_id: Number(docenteSeleccionado) || null,
          gestion_id: Number(gestionSeleccionada),
          cupos: Number(cupos),
        },
      ]);
      setMateriaSeleccionada("");
      setDocenteSeleccionado("");
      setCupos("");
    }
  };

  const materiasFiltradas = materias.filter(
    (materia) => materia.nivel_id === Number(nivelSeleccionado)
  );

  const removeAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      console.log(assignments);
      const response = await GeneralService.crearParalelos(assignments);

      if (response.result === "ok") {
        toast.success(response.message);
        setAssignments([]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster></Toaster>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Gestión
          </Label>
          <Select
            value={gestionSeleccionada}
            onValueChange={setGestionSeleccionada}
          >
            <SelectTrigger className="border-slate-300 focus:border-blue-500 w-full">
              <SelectValue placeholder="Seleccionar gestión" />
            </SelectTrigger>
            <SelectContent>
              {mockGestions.map((gestion) => (
                <SelectItem key={gestion.id} value={String(gestion.id)}>
                  {gestion.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Nivel
          </Label>
          <Select
            value={nivelSeleccionado}
            onValueChange={setNivelSeleccionado}
          >
            <SelectTrigger className="border-slate-300 focus:border-blue-500 w-full">
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
            <University className="w-4 h-4" />
            Nombre del Paralelo
          </Label>
          <Select value={parallelName} onValueChange={setParallelName}>
            <SelectTrigger className="border-slate-300 focus:border-blue-500 w-full">
              <SelectValue placeholder="Seleccionar paralelo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="D">D</SelectItem>
              <SelectItem value="E">E</SelectItem>
              <SelectItem value="F">F</SelectItem>
              <SelectItem value="G">G</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Asignar Materias y Docentes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label className="text-sm">Materia</Label>
              <Select
                value={materiaSeleccionada}
                onValueChange={setMateriaSeleccionada}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar materia" />
                </SelectTrigger>
                <SelectContent>
                  {materiasFiltradas.map((materia) => (
                    <SelectItem key={materia.id} value={String(materia.id)}>
                      {materia.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Docente</Label>
              <Select
                value={docenteSeleccionado}
                onValueChange={setDocenteSeleccionado}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar docente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={""} value={"null"}>
                    No asignado
                  </SelectItem>
                  {mockTeachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={String(teacher.id)}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="cupos"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Users2 className="w-4 h-4" />
                Cupos
              </Label>
              <Input
                type="number"
                id="cupos"
                placeholder="Ej. 40"
                value={cupos}
                onChange={(e) => setCupos(e.target.value)}
                className="border-slate-300 focus:border-blue-500"
              />
            </div>

            <div className="col-start-3 row-start-2 flex items-center ">
              <Button
                onClick={addAssignment}
                disabled={
                  !materiaSeleccionada ||
                  !docenteSeleccionado ||
                  !gestionSeleccionada ||
                  !nivelSeleccionado ||
                  !(Number(cupos) > 0)
                }
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>
          </div>

          {assignments.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Asignaciones:</Label>
              <div className="space-y-2">
                {assignments.map((assignment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-900 font-bold flex items-center gap-1">
                        <University className="w-4 h-4" />
                        {assignment.nombre}
                      </span>
                      <span className="text-slate-900 font-bold flex items-center gap-1">
                        <Users2 className="w-4 h-4" />
                        {assignment.cupos}
                      </span>

                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {
                          materias.find((m) => m.id === assignment.materia_id)
                            ?.nombre
                        }
                      </Badge>
                      <span className="text-sm text-slate-600 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {mockTeachers.find(
                          (d) => d.id === assignment.docente_id
                        )?.name || "No asignado"}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAssignment(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={assignments.length === 0}
          className="bg-blue-500 hover:bg-blue-600 px-8"
        >
          Crear Paralelo
        </Button>
      </div>
    </div>
  );
}
