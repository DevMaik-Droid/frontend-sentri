"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { GeneralService } from "../../../services/general.service";
import { DatePicker } from "../../moleculas/DatePicker";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { EstudianteService } from "../../../services/estudiante/estudiante.service";

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

export function ListaContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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

  // Obtener cursos únicos para el filtro
  const uniqueCourses = Array.from(
    new Set(studentsData.map((student) => student.course))
  );

  const [niveles, setNiveles] = useState<Niveles[]>([]);

  const handleAddStudent = async (data: any) => {
    try {
      const res = await EstudianteService.registrarEstudiante(data);
      if (res.status === 201) {
        setIsAddDialogOpen(false);
        toast.success("Estudiante registrado con éxito");
      } else {
        toast.error("Error al registrar estudiante");
      }
    } catch (error) {
      console.log(error);
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
    obtener_niveles();
  }, []);

  return (
    <div className="space-y-4">
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
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por carrera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las carreras</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
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

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Agregar Estudiante
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Estudiante</DialogTitle>
                <DialogDescription>
                  Complete los datos del estudiante. Todos los campos son
                  obligatorios.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex gap-4">
                  <div className="space-y-2 w-1/2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Nombre" />
                  </div>
                  <div className="space-y-2 w-1/2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="Apellido" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Direccion</Label>
                  <Input id="direccion" placeholder="Z, calle, avenida" />
                </div>

                <div className="flex gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha de Nacimiento</Label>
                    <DatePicker />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Cedula</Label>
                    <Input id="telefono" placeholder="Cedula" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Telefono</Label>
                    <Input id="telefono" placeholder="Telefono" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genero">Genero: </Label>
                  <RadioGroup defaultValue="comfortable" >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="M" id="r1" />
                      <Label htmlFor="r1">Masculino</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="F" id="r2" />
                      <Label htmlFor="r2">Femenino</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="codigo">Codigo</Label>
                    <Input
                    id="codigo"
                    type="text"
                    placeholder="XXXXXXXX"
                  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semestre</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar semestre" />
                      </SelectTrigger>
                      <SelectContent>
                        {niveles?.map((nivel) => (
                          <SelectItem key={nivel.id} value={nivel.nombre}>
                            {nivel.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddStudent}>
                  Guardar Estudiante
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
