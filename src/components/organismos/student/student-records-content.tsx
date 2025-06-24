"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Upload,
  FileText,
  Eye,
  Edit,
  Trash,
  Plus,
  User,
  GraduationCap,
  Calendar,
  Award,
} from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { AvatarImageCustom } from "../../atomos/avatar-image"
import { CustomBadge } from "../../atomos/custom-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import { Label } from "../../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"

// Datos de ejemplo para expedientes
const recordsData = [
  {
    id: "EST001",
    name: "Ana García",
    email: "ana.garcia@email.com",
    course: "Ingeniería de Software",
    semester: "5to Semestre",
    status: "Activo",
    enrollmentDate: "2022-08-15",
    gpa: 8.7,
    totalCredits: 120,
    completedCredits: 85,
    documents: {
      certificate: true,
      transcript: true,
      identification: true,
      photos: true,
      medicalRecord: false,
    },
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    course: "Ciencias de la Computación",
    semester: "3er Semestre",
    status: "Activo",
    enrollmentDate: "2023-01-20",
    gpa: 7.9,
    totalCredits: 120,
    completedCredits: 45,
    documents: {
      certificate: true,
      transcript: true,
      identification: true,
      photos: true,
      medicalRecord: true,
    },
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST003",
    name: "María López",
    email: "maria.lopez@email.com",
    course: "Diseño Gráfico",
    semester: "7mo Semestre",
    status: "Inactivo",
    enrollmentDate: "2021-08-10",
    gpa: 9.2,
    totalCredits: 100,
    completedCredits: 95,
    documents: {
      certificate: true,
      transcript: true,
      identification: true,
      photos: false,
      medicalRecord: true,
    },
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST004",
    name: "José Martínez",
    email: "jose.martinez@email.com",
    course: "Ingeniería de Software",
    semester: "5to Semestre",
    status: "Activo",
    enrollmentDate: "2022-08-15",
    gpa: 7.3,
    totalCredits: 120,
    completedCredits: 80,
    documents: {
      certificate: true,
      transcript: false,
      identification: true,
      photos: true,
      medicalRecord: false,
    },
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST005",
    name: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    course: "Marketing Digital",
    semester: "1er Semestre",
    status: "Activo",
    enrollmentDate: "2024-01-15",
    gpa: 9.5,
    totalCredits: 120,
    completedCredits: 15,
    documents: {
      certificate: true,
      transcript: true,
      identification: true,
      photos: true,
      medicalRecord: true,
    },
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Datos de ejemplo para documentos
const documentTypes = [
  { id: "certificate", name: "Certificado de Bachillerato", required: true },
  { id: "transcript", name: "Historial Académico", required: true },
  { id: "identification", name: "Identificación Oficial", required: true },
  { id: "photos", name: "Fotografías", required: true },
  { id: "medicalRecord", name: "Certificado Médico", required: false },
]

export function StudentRecordsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // Filtrar expedientes basado en búsqueda y filtros
  const filteredRecords = recordsData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCourse = selectedCourse === "all" || record.course === selectedCourse
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus

    return matchesSearch && matchesCourse && matchesStatus
  })

  // Obtener cursos únicos para el filtro
  const uniqueCourses = Array.from(new Set(recordsData.map((record) => record.course)))

  // Función para calcular el progreso de documentos
  const getDocumentProgress = (documents: any) => {
    const total = Object.keys(documents).length
    const completed = Object.values(documents).filter(Boolean).length
    return (completed / total) * 100
  }

  // Función para obtener el color del GPA
  const getGPAColor = (gpa: number) => {
    if (gpa >= 9) return "text-green-600"
    if (gpa >= 8) return "text-blue-600"
    if (gpa >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  const handleViewRecord = (student: any) => {
    setSelectedStudent(student)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Pestañas */}
      <Tabs defaultValue="records">
        <TabsList>
          <TabsTrigger value="records">Expedientes</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="academic">Historial Académico</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4 pt-4">
          {/* Barra de herramientas */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar expedientes..."
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
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Importar
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Expediente
              </Button>
            </div>
          </div>

          {/* Tabla de expedientes */}
          <Card>
            <CardHeader>
              <CardTitle>Expedientes Estudiantiles</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Carrera</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Créditos</TableHead>
                    <TableHead>Documentos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No se encontraron expedientes con los criterios de búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <AvatarImageCustom src={record.avatar || "/placeholder.svg"} alt={record.name} size="md" />
                            <div>
                              <div className="font-medium">{record.name}</div>
                              <div className="text-sm text-muted-foreground">{record.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{record.course}</TableCell>
                        <TableCell>{record.semester}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${getGPAColor(record.gpa)}`}>{record.gpa}</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              {record.completedCredits}/{record.totalCredits}
                            </div>
                            <div className="text-muted-foreground">
                              {Math.round((record.completedCredits / record.totalCredits) * 100)}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${getDocumentProgress(record.documents)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{Math.round(getDocumentProgress(record.documents))}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <CustomBadge variant={record.status === "Activo" ? "default" : "secondary"}>
                            {record.status}
                          </CustomBadge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewRecord(record)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Expediente
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Generar Reporte
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
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documentTypes.map((docType) => (
                  <Card key={docType.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{docType.name}</h4>
                      {docType.required && <CustomBadge variant="destructive">Requerido</CustomBadge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Documento {docType.required ? "obligatorio" : "opcional"} para el expediente estudiantil.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Subir Documento
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial Académico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  <span>Historial de Calificaciones</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Historial de Asistencia</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <Award className="h-6 w-6" />
                  <span>Certificaciones y Logros</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Reportes Académicos</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para ver expediente completo */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Expediente Estudiantil</DialogTitle>
            <DialogDescription>Información completa del expediente de {selectedStudent?.name}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="grid gap-6 py-4">
              {/* Información personal */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información Personal
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>ID Estudiante</Label>
                    <p className="font-medium">{selectedStudent.id}</p>
                  </div>
                  <div>
                    <Label>Nombre Completo</Label>
                    <p className="font-medium">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <Label>Correo Electrónico</Label>
                    <p className="font-medium">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <Label>Fecha de Inscripción</Label>
                    <p className="font-medium">{selectedStudent.enrollmentDate}</p>
                  </div>
                </div>
              </div>

              {/* Información académica */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Información Académica
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Carrera</Label>
                    <p className="font-medium">{selectedStudent.course}</p>
                  </div>
                  <div>
                    <Label>Semestre Actual</Label>
                    <p className="font-medium">{selectedStudent.semester}</p>
                  </div>
                  <div>
                    <Label>GPA</Label>
                    <p className={`font-medium ${getGPAColor(selectedStudent.gpa)}`}>{selectedStudent.gpa}</p>
                  </div>
                  <div>
                    <Label>Créditos Completados</Label>
                    <p className="font-medium">
                      {selectedStudent.completedCredits}/{selectedStudent.totalCredits}
                    </p>
                  </div>
                </div>
              </div>

              {/* Estado de documentos */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Estado de Documentos
                </h3>
                <div className="grid gap-2">
                  {documentTypes.map((docType) => (
                    <div key={docType.id} className="flex items-center justify-between p-2 border rounded">
                      <span>{docType.name}</span>
                      <CustomBadge variant={selectedStudent.documents[docType.id] ? "default" : "destructive"}>
                        {selectedStudent.documents[docType.id] ? "Completo" : "Pendiente"}
                      </CustomBadge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Cerrar
            </Button>
            <Button>Editar Expediente</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
