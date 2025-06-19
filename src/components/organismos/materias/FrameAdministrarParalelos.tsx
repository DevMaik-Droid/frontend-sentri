import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Calendar,
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  Search,
  SortAsc,
  SortDesc,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Badge } from "../../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";

// Mock data expandido
const mockParallels = [
  {
    id: "1",
    name: "Paralelo A - Ingeniería",
    gestion: "2024-I",
    students: 35,
    status: "Activo",
    createdAt: "2024-01-15",
    assignments: [
      { subject: "Matemáticas I", teacher: "Dr. María González", credits: 4 },
      { subject: "Física I", teacher: "Ing. Carlos Rodríguez", credits: 3 },
      { subject: "Química General", teacher: "Lic. Ana Martínez", credits: 3 },
    ],
  },
  {
    id: "2",
    name: "Paralelo B - Ingeniería",
    gestion: "2024-I",
    students: 28,
    status: "Activo",
    createdAt: "2024-01-20",
    assignments: [
      { subject: "Programación I", teacher: "Dr. Pedro Sánchez", credits: 4 },
      { subject: "Álgebra Lineal", teacher: "Ing. Laura López", credits: 3 },
    ],
  },
  {
    id: "3",
    name: "Paralelo C - Medicina",
    gestion: "2024-II",
    students: 42,
    status: "Activo",
    createdAt: "2024-02-01",
    assignments: [
      { subject: "Anatomía", teacher: "Dr. José Hernández", credits: 5 },
      { subject: "Biología", teacher: "Dra. Carmen Silva", credits: 4 },
      { subject: "Fisiología", teacher: "Dr. Roberto Paz", credits: 4 },
    ],
  },
  {
    id: "4",
    name: "Paralelo D - Derecho",
    gestion: "2024-I",
    students: 25,
    status: "Inactivo",
    createdAt: "2024-01-10",
    assignments: [
      { subject: "Derecho Civil", teacher: "Abg. María Torres", credits: 4 },
      { subject: "Derecho Penal", teacher: "Abg. Luis Morales", credits: 3 },
    ],
  },
];

export default function FrameAdministrarParalelos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGestion, setFilterGestion] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [parallels, setParallels] = useState(mockParallels);

  const [viewingParallel, setViewingParallel] = useState<any>(null)
  const [editingParallel, setEditingParallel] = useState<any>(null)

  // Filtros y ordenamiento
  const filteredParallels = parallels
    .filter((parallel) => {
      const matchesSearch = parallel.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGestion =
        filterGestion === "all" || parallel.gestion === filterGestion;
      const matchesStatus =
        filterStatus === "all" || parallel.status === filterStatus;
      return matchesSearch && matchesGestion && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800"
      case "Inactivo":
        return "bg-red-100 text-red-800"
      case "Confirmado":
        return "bg-blue-100 text-blue-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }



  const deleteParallel = (id: string) => {
    setParallels(parallels.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar paralelos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-80"
            />
          </div>
          <Select value={filterGestion} onValueChange={setFilterGestion}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Gestión" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="2024-I">2024-I</SelectItem>
              <SelectItem value="2024-II">2024-II</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Nombre
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("gestion")}>
                Gestión
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("students")}>
                Estudiantes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("createdAt")}>
                Fecha
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? "Descendente" : "Ascendente"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Lista de paralelos */}
      <div className="grid gap-4">
        {filteredParallels.map((parallel) => (
          <Card
            key={parallel.id}
            className="border-slate-400 hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{parallel.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {parallel.gestion}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {parallel.students} estudiantes
                      </span>
                      <Badge className={getStatusColor(parallel.status)}>
                        {parallel.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setViewingParallel(parallel)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setEditingParallel(parallel)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => deleteParallel(parallel.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    Materias ({parallel.assignments.length})
                  </h4>
                  <div className="space-y-1">
                    {parallel.assignments
                      .slice(0, 2)
                      .map((assignment, index) => (
                        <div key={index} className="text-sm text-slate-600">
                          {assignment.subject} - {assignment.credits} créditos
                        </div>
                      ))}
                    {parallel.assignments.length > 2 && (
                      <div className="text-sm text-blue-600 cursor-pointer">
                        +{parallel.assignments.length - 2} más...
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    Información
                  </h4>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div>Creado: {parallel.createdAt}</div>
                    <div>
                      Total créditos:{" "}
                      {parallel.assignments.reduce(
                        (acc, a) => acc + a.credits,
                        0
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de edición de paralelo ====================================================*/}
        <Dialog open={!!editingParallel} onOpenChange={() => setEditingParallel(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Paralelo</DialogTitle>
              <DialogDescription>Modifica la información del paralelo seleccionado.</DialogDescription>
            </DialogHeader>
            {editingParallel && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre del Paralelo</Label>
                    <Input defaultValue={editingParallel.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Gestión</Label>
                    <Select defaultValue={editingParallel.gestion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-I">2024-I</SelectItem>
                        <SelectItem value="2024-II">2024-II</SelectItem>
                        <SelectItem value="2025-I">2025-I</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Número de Estudiantes</Label>
                    <Input type="number" defaultValue={editingParallel.students} />
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Select defaultValue={editingParallel.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Asignaciones</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {editingParallel.assignments.map((assignment: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                        <Input defaultValue={assignment.subject} className="flex-1" />
                        <Input defaultValue={assignment.teacher} className="flex-1" />
                        <Input type="number" defaultValue={assignment.credits} className="w-20" />
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Agregar Asignación
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingParallel(null)}>
                Cancelar
              </Button>
              <Button onClick={() => setEditingParallel(null)}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Modal de edición de paralelo ====================================================*/}

        {/* Modal de vista detallada -------------------------------------------------- */}
        <Dialog open={!!viewingParallel} onOpenChange={() => setViewingParallel(null)} >

          <DialogContent className="w-7xl">

            <DialogHeader>
              <DialogTitle>Detalles del Paralelo</DialogTitle>
              <DialogDescription>Información completa del paralelo seleccionado.</DialogDescription>
            </DialogHeader>

            {viewingParallel && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Nombre:</span>
                        <span className="font-medium">{viewingParallel.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Gestión:</span>
                        <span className="font-medium">{viewingParallel.gestion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Estudiantes:</span>
                        <span className="font-medium">{viewingParallel.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Estado:</span>
                        <Badge className={getStatusColor(viewingParallel.status)}>{viewingParallel.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Creado:</span>
                        <span className="font-medium">{viewingParallel.createdAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Estadísticas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Materias:</span>
                        <span className="font-medium">{viewingParallel.assignments.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Créditos:</span>
                        <span className="font-medium">
                          {viewingParallel.assignments.reduce((acc: number, a: any) => acc + a.credits, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Promedio Créditos:</span>
                        <span className="font-medium">
                          {(
                            viewingParallel.assignments.reduce((acc: number, a: any) => acc + a.credits, 0) /
                            viewingParallel.assignments.length
                          ).toFixed(1)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Asignaciones Detalladas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {viewingParallel.assignments.map((assignment: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {assignment.subject}
                            </Badge>
                            <span className="text-sm text-slate-600 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {assignment.teacher}
                            </span>
                          </div>
                          <Badge variant="outline">{assignment.credits} créditos</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setViewingParallel(null)}>Cerrar</Button>
            </DialogFooter>
            
          </DialogContent>

        </Dialog>
        {/* Modal de vista detallada -------------------------------------------------- */}
    </div>

    
  );
}
