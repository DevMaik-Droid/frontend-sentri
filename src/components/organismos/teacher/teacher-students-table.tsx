import { Plus, Award, UserCheck } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
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
import { MoreHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

const teacherStudentsData = [
  {
    id: "EST001",
    name: "Ana García",
    email: "ana.garcia@email.com",
    subject: "Programación OO",
    group: "A",
    attendance: 95,
    grade: 8.5,
    status: "Activo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    subject: "Estructuras de Datos",
    group: "B",
    attendance: 88,
    grade: 7.8,
    status: "Activo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST003",
    name: "María López",
    email: "maria.lopez@email.com",
    subject: "Ingeniería de Software",
    group: "A",
    attendance: 92,
    grade: 9.2,
    status: "Activo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST004",
    name: "José Martínez",
    email: "jose.martinez@email.com",
    subject: "Base de Datos",
    group: "C",
    attendance: 78,
    grade: 6.5,
    status: "En riesgo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST005",
    name: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    subject: "Taller de Programación",
    group: "D",
    attendance: 100,
    grade: 9.8,
    status: "Excelente",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function TeacherStudentsTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Estudiantes Asignados</CardTitle>
            <CardDescription>Lista de estudiantes en todas las materias</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por materia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las materias</SelectItem>
                <SelectItem value="poo">Programación OO</SelectItem>
                <SelectItem value="ed">Estructuras de Datos</SelectItem>
                <SelectItem value="is">Ingeniería de Software</SelectItem>
                <SelectItem value="bd">Base de Datos</SelectItem>
                <SelectItem value="tp">Taller de Programación</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Exportar Lista
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>Materia</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Asistencia</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherStudentsData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <AvatarImageCustom src={student.avatar || "/placeholder.svg"} alt={student.name} size="md" />
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{student.subject}</TableCell>
                <TableCell>{student.group}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    {student.attendance}%
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    {student.grade}
                  </div>
                </TableCell>
                <TableCell>
                  <CustomBadge
                    variant={
                      student.status === "Excelente"
                        ? "default"
                        : student.status === "En riesgo"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {student.status}
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
                      <DropdownMenuItem>Ver Expediente</DropdownMenuItem>
                      <DropdownMenuItem>Editar Calificación</DropdownMenuItem>
                      <DropdownMenuItem>Ver Asistencia</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Enviar Mensaje</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
