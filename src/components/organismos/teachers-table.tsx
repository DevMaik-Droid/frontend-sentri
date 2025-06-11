import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { AvatarImage } from "../atomos/avatar-image"
import { CustomBadge } from "../atomos/custom-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const teachersData = [
  {
    id: "DOC001",
    name: "Dr. Roberto Méndez",
    email: "roberto.mendez@email.com",
    department: "Ingeniería",
    specialty: "Desarrollo de Software",
    status: "Activo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "DOC002",
    name: "Dra. Claudia Vázquez",
    email: "claudia.vazquez@email.com",
    department: "Ciencias",
    specialty: "Matemáticas Aplicadas",
    status: "Activo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "DOC003",
    name: "Mtro. Fernando Ruiz",
    email: "fernando.ruiz@email.com",
    department: "Diseño",
    specialty: "Diseño de Interfaces",
    status: "Inactivo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "DOC004",
    name: "Dra. Patricia Soto",
    email: "patricia.soto@email.com",
    department: "Ingeniería",
    specialty: "Inteligencia Artificial",
    status: "Activo",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function TeachersTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Docentes</CardTitle>
            <CardDescription>Lista de docentes registrados</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Docente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Docente</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachersData.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} size="md" />
                    <div>
                      <div className="font-medium">{teacher.name}</div>
                      <div className="text-sm text-muted-foreground">{teacher.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.specialty}</TableCell>
                <TableCell>
                  <CustomBadge variant={teacher.status === "Activo" ? "default" : "secondary"}>
                    {teacher.status}
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
                      <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Ver Materias</DropdownMenuItem>
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
