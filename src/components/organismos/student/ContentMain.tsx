"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Plus,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { AvatarImage } from "../../atomos/avatar-image";
import { CustomBadge } from "../../atomos/custom-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { GeneralService } from "../../../services/general.service";
import { CustomDialog } from "../../moleculas/CustomDialog";
import { FormularioRegistro } from "../../moleculas/estudiante/FormularioRegistro";
import { EstudianteService } from "../../../services/estudiante/estudiante.service";
import type { Estudiante } from "../../../types/estudiante/estudiante-types";
import { useForm } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
// Datos de ejemplo para estudiantes
const studentsData = [
  {
    id: "EST001",
    name: "Ana García",
    email: "ana.garcia@email.com",
    course: "Ingeniería de Software",
    semester: "5to Semestre",
    status: "Activo",
    grade: "A",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    course: "Ciencias de la Computación",
    semester: "3er Semestre",
    status: "Activo",
    grade: "B+",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST003",
    name: "María López",
    email: "maria.lopez@email.com",
    course: "Diseño Gráfico",
    semester: "7mo Semestre",
    status: "Inactivo",
    grade: "A-",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST004",
    name: "José Martínez",
    email: "jose.martinez@email.com",
    course: "Ingeniería de Software",
    semester: "5to Semestre",
    status: "Activo",
    grade: "B",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST005",
    name: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    course: "Marketing Digital",
    semester: "1er Semestre",
    status: "Activo",
    grade: "A+",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST006",
    name: "Roberto Gómez",
    email: "roberto.gomez@email.com",
    course: "Ingeniería Civil",
    semester: "9no Semestre",
    status: "Activo",
    grade: "B+",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST007",
    name: "Patricia Flores",
    email: "patricia.flores@email.com",
    course: "Medicina",
    semester: "6to Semestre",
    status: "Activo",
    grade: "A",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST008",
    name: "Miguel Torres",
    email: "miguel.torres@email.com",
    course: "Arquitectura",
    semester: "4to Semestre",
    status: "Inactivo",
    grade: "C+",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

interface Niveles {
  id: number;
  nombre: string;
  description: string;
}

interface Materias {
  id: number;
  nombre: string;
  description: string;
}

export function ContentMain() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Filtrar estudiantes basado en búsqueda y filtros
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || student.status === selectedStatus;
    const matchesCourse =
      selectedCourse === "all" || student.course === selectedCourse;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const [niveles, setNiveles] = useState<Niveles[]>([]);
  const [materias, setMaterias] = useState<Materias[]>([]);

  const { register, handleSubmit, setValue, reset } = useForm<Estudiante>();

  useEffect(() => {
    const obtener_niveles = async () => {
      try {
        const res = await GeneralService.getNiveles();
        setNiveles(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const obtener_materias = async () => {
      try {
        const res = await GeneralService.getMaterias();
        setMaterias(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    obtener_niveles();
    obtener_materias();
  }, []);

  const registrarEstudiante = async (estudiante: Estudiante) => {
    estudiante.usuario.password_hash = estudiante.usuario.cedula;
    estudiante.usuario.rol_id = 3;
    console.log(estudiante);
    try {
      const response = await EstudianteService.registrarEstudiante(estudiante);
      if (response.result === "ok") {
        toast.success(response.message);
        reset();
      } else {
        console.log("Error al registrar estudiante");
      }
    } catch (error) {
      console.log("Error al registrar estudiante", error);
    }
  };

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
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los semestres</SelectItem>
              {niveles?.map((nivel) => (
                <SelectItem key={nivel.id} value={String(nivel.id)}>
                  {nivel.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por carrera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las materias</SelectItem>
              {materias?.map((materia) => (
                <SelectItem key={materia.id} value={String(materia.id)}>
                  {materia.nombre}
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
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="inactive">Inactivos</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tabla de estudiantes */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Estudiante</TableHead>
                <TableHead>Carrera</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Promedio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No se encontraron estudiantes con los criterios de búsqueda.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <AvatarImage
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                          size="md"
                        />
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell>
                      <CustomBadge
                        variant={
                          student.status === "Activo" ? "default" : "secondary"
                        }
                      >
                        {student.status}
                      </CustomBadge>
                    </TableCell>
                    <TableCell>
                      <CustomBadge variant="outline">
                        {student.grade}
                      </CustomBadge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginación */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando <strong>{filteredStudents.length}</strong> de{" "}
          <strong>{studentsData.length}</strong> estudiantes
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
