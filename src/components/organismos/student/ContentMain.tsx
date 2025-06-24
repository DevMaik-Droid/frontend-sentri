"use client";

import { useEffect, useState } from "react";
import { Download, Upload, Search, Filter, Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { GeneralService } from "../../../services/general.service";
import { CustomDialog } from "../../moleculas/CustomDialog";
import { FormularioRegistro } from "../../moleculas/estudiante/FormularioRegistro";
import { EstudianteService } from "../../../services/estudiante/estudiante.service";
import type { EstudianteCompleto } from "../../../types/estudiante/estudiante-types";
import { useForm } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
import type { Niveles } from "../../../types/general/general-types";
import TablaEstudiantes from "../../moleculas/estudiante/TablaEstudiantes";

// Datos de ejemplo para estudiantes

export function ContentMain() {
  const [searchTerm, setSearchTerm] = useState("");
  const [niveles, setNiveles] = useState<Niveles[]>([]);
  const [estudiantes, setEstudiantes] = useState<EstudianteCompleto[]>([]);

  const [nivelSeleccionado, setNivelSeleccionado] = useState("TODOS");

  const { register, handleSubmit, setValue, reset } = useForm<EstudianteCompleto>();


  const actualizar_tabla = async () => {
    try {
      const res = await EstudianteService.obtenerTodosEstudiante();
      if (res.result === "ok") {
        setEstudiantes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const registrarEstudiante = async (estudiante: EstudianteCompleto) => {
    estudiante.usuario.password_hash = estudiante.usuario.cedula;
    estudiante.usuario.rol_id = 3;
    console.log(estudiante);
    try {
      const response = await EstudianteService.registrarEstudiante(estudiante);
      if (response.result === "ok") {
        toast.success(response.message);
        reset();
        actualizar_tabla();
      } else {
        console.log("Error al registrar estudiante");
      }
    } catch (error) {
      console.log("Error al registrar estudiante", error);
    }
  };

   useEffect(() => {
    const obtener_niveles = async () => {
      try {
        const res = await GeneralService.getNiveles();
        setNiveles(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    actualizar_tabla();
    obtener_niveles();
  }, []);

  return (
    <div className="space-y-4">
      <Toaster></Toaster>
      {/* Barra de herramientas */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar estudiantes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={nivelSeleccionado}
            onValueChange={setNivelSeleccionado}
            defaultValue="TODOS"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por nivel" />
            </SelectTrigger>
            <SelectContent>

              <SelectItem value="TODOS">Todos los Niveles</SelectItem>

              {niveles?.map((nivel) => (
                <SelectItem key={nivel.id} value={nivel.nombre}>
                  {nivel.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          <CustomDialog
            triggerLabel="Agregar Estudiante"
            title="Agregar Estudiante"
            description="Agrega un nuevo estudiante"
            triggerIcon={<Plus className="mr-2 h-4 w-4" />}
            confirmLabel="Agregar Estudiante"
            onConfirm={handleSubmit(registrarEstudiante)}
          >
            <FormularioRegistro
              register={register}
              setValue={setValue}
              niveles={niveles}
            ></FormularioRegistro>
          </CustomDialog>
        </div>
      </div>

      {/* Pestañas */}
      <Tabs defaultValue="TODOS">
        <TabsList>
          <TabsTrigger value="TODOS">Todos</TabsTrigger>
          <TabsTrigger value="ACTIVOS">Activos</TabsTrigger>
          <TabsTrigger value="INACTIVOS">Inactivos</TabsTrigger>
        </TabsList>

        <TabsContent value="TODOS">
          {/* Tabla de estudiantes */}
          <Card>
            <CardContent className="p-0">
              <TablaEstudiantes
                estudiantes={estudiantes}
                nivelSeleccionado={nivelSeleccionado}
                filtro = "TODOS"
              />

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ACTIVOS">
          {/* Tabla de estudiantes */}
          <Card>
            <CardContent className="p-0">
              <TablaEstudiantes
                estudiantes={estudiantes}
                nivelSeleccionado={nivelSeleccionado}
                filtro = "ACTIVO"
              />

            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="INACTIVOS">
          {/* Tabla de estudiantes */}
          <Card>
            <CardContent className="p-0">
              <TablaEstudiantes
                estudiantes={estudiantes}
                nivelSeleccionado={nivelSeleccionado}
                filtro = "INACTIVO"
              />

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>


      


    </div>
  );
}
