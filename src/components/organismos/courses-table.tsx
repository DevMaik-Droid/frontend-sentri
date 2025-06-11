import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { CustomBadge } from "../atomos/custom-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const coursesData = [
  {
    id: "MAT001",
    name: "Programación Orientada a Objetos",
    code: "POO-101",
    semester: "3er Semestre",
    students: 28,
    teacher: "Dr. Roberto Méndez",
    status: "En curso",
  },
  {
    id: "MAT002",
    name: "Cálculo Diferencial",
    code: "MAT-201",
    semester: "1er Semestre",
    students: 35,
    teacher: "Dra. Claudia Vázquez",
    status: "En curso",
  },
  {
    id: "MAT003",
    name: "Diseño de Interfaces",
    code: "DIS-301",
    semester: "5to Semestre",
    students: 22,
    teacher: "Mtro. Fernando Ruiz",
    status: "Finalizado",
  },
  {
    id: "MAT004",
    name: "Inteligencia Artificial",
    code: "IA-401",
    semester: "7mo Semestre",
    students: 18,
    teacher: "Dra. Patricia Soto",
    status: "En curso",
  },
  {
    id: "MAT005",
    name: "Taller de Emprendimiento",
    code: "EMP-101",
    semester: "Curso Temporal",
    students: 25,
    teacher: "Mtro. Fernando Ruiz",
    status: "Próximo",
  },
]

export function CoursesTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Materias y Cursos</CardTitle>
            <CardDescription>Lista de materias, cursos temporales y talleres</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Curso
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Semestre/Tipo</TableHead>
              <TableHead>Estudiantes</TableHead>
              <TableHead>Docente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesData.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.teacher}</TableCell>
                <TableCell>
                  <CustomBadge
                    variant={
                      course.status === "En curso"
                        ? "default"
                        : course.status === "Finalizado"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {course.status}
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
                      <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Ver Estudiantes</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
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
