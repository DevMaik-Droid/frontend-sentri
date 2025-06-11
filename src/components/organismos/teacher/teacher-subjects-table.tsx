import { Plus, Users, FileText } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { CustomBadge } from "../../atomos/custom-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const subjectsData = [
  {
    id: "MAT001",
    name: "Programación Orientada a Objetos",
    code: "POO-101",
    group: "A",
    schedule: "Lun-Mie-Vie 8:00-10:00",
    students: 28,
    status: "En curso",
    nextClass: "2024-01-15 08:00",
  },
  {
    id: "MAT002",
    name: "Estructuras de Datos",
    code: "ED-201",
    group: "B",
    schedule: "Mar-Jue 10:00-12:00",
    students: 25,
    status: "En curso",
    nextClass: "2024-01-16 10:00",
  },
  {
    id: "MAT003",
    name: "Ingeniería de Software",
    code: "IS-301",
    group: "A",
    schedule: "Lun-Mie 14:00-16:00",
    students: 22,
    status: "En curso",
    nextClass: "2024-01-15 14:00",
  },
  {
    id: "MAT004",
    name: "Base de Datos Avanzadas",
    code: "BDA-401",
    group: "C",
    schedule: "Vie 16:00-18:00",
    students: 18,
    status: "En curso",
    nextClass: "2024-01-17 16:00",
  },
  {
    id: "MAT005",
    name: "Taller de Programación",
    code: "TP-101",
    group: "D",
    schedule: "Sáb 8:00-12:00",
    students: 34,
    status: "En curso",
    nextClass: "2024-01-18 08:00",
  },
]

export function TeacherSubjectsTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mis Materias</CardTitle>
            <CardDescription>Materias asignadas para el semestre actual</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Contenido
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Materia</TableHead>
              <TableHead>Grupo</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Estudiantes</TableHead>
              <TableHead>Próxima Clase</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjectsData.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{subject.name}</div>
                    <div className="text-sm text-muted-foreground">{subject.code}</div>
                  </div>
                </TableCell>
                <TableCell>{subject.group}</TableCell>
                <TableCell className="text-sm">{subject.schedule}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {subject.students}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{subject.nextClass}</TableCell>
                <TableCell>
                  <CustomBadge variant="default">{subject.status}</CustomBadge>
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
                        <Users className="mr-2 h-4 w-4" />
                        Ver Estudiantes
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Tomar Asistencia
                      </DropdownMenuItem>
                      <DropdownMenuItem>Capturar Calificaciones</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Ver Contenido</DropdownMenuItem>
                      <DropdownMenuItem>Configurar</DropdownMenuItem>
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
