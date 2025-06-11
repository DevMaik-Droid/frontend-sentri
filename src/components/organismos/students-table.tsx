import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table"
import { StudentRow } from "../moleculas/student-row"

interface Student {
    id: string;
    name: string;
    email: string;
    course: string;
    status: "Activo" | "Inactivo";
    grade: string;
    avatar: string;
}


const studentsData : Student[] = [
  {
    id: "EST001",
    name: "Ana García",
    email: "ana.garcia@email.com",
    course: "Ingeniería de Software",
    status: "Activo" as const,
    grade: "A",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    course: "Ciencias de la Computación",
    status: "Activo" as const,
    grade: "B+",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST003",
    name: "María López",
    email: "maria.lopez@email.com",
    course: "Diseño Gráfico",
    status: "Inactivo" as const,
    grade: "A-",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST004",
    name: "José Martínez",
    email: "jose.martinez@email.com",
    course: "Ingeniería de Software",
    status: "Activo" as const,
    grade: "B",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "EST005",
    name: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    course: "Marketing Digital",
    status: "Activo" as const,
    grade: "A+",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function StudentsTable() {
  const handleEdit = (student: any) => {
    console.log("Editar estudiante:", student)
  }

  const handleDelete = (student: any) => {
    console.log("Eliminar estudiante:", student)
  }

  const handleViewProfile = (student: any) => {
    console.log("Ver perfil:", student)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Estudiantes Recientes</CardTitle>
            <CardDescription>Lista de estudiantes registrados recientemente</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Estudiante
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsData.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewProfile={handleViewProfile}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
