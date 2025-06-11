import { Clock, CheckCircle, AlertCircle, FileText } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { CustomBadge } from "../../atomos/custom-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

const assignmentsData = [
  {
    id: "T001",
    title: "Proyecto Final POO",
    subject: "Programación OO",
    dueDate: "2024-01-20",
    status: "Pendiente",
    priority: "Alta",
    description: "Desarrollo de aplicación web con Java",
    grade: null,
  },
  {
    id: "T002",
    title: "Ensayo sobre Cálculo",
    subject: "Cálculo Diferencial",
    dueDate: "2024-01-18",
    status: "Entregada",
    priority: "Media",
    description: "Análisis de funciones derivadas",
    grade: 9.0,
  },
  {
    id: "T003",
    title: "Presentación en Inglés",
    subject: "Inglés Técnico",
    dueDate: "2024-01-22",
    status: "Pendiente",
    priority: "Media",
    description: "Presentación sobre tecnología",
    grade: null,
  },
  {
    id: "T004",
    title: "Diseño de Base de Datos",
    subject: "Base de Datos",
    dueDate: "2024-01-15",
    status: "Vencida",
    priority: "Alta",
    description: "Modelo ER para sistema de ventas",
    grade: null,
  },
  {
    id: "T005",
    title: "Marco Teórico",
    subject: "Metodología",
    dueDate: "2024-01-25",
    status: "Calificada",
    priority: "Baja",
    description: "Investigación bibliográfica",
    grade: 8.5,
  },
]

export function StudentAssignmentsTable() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregada":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "Calificada":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Vencida":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Entregada":
        return "default"
      case "Calificada":
        return "default"
      case "Vencida":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "destructive"
      case "Media":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tareas y Actividades</CardTitle>
            <CardDescription>Actividades pendientes y entregadas</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="submitted">Entregadas</SelectItem>
                <SelectItem value="graded">Calificadas</SelectItem>
                <SelectItem value="overdue">Vencidas</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Nueva Entrega
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarea</TableHead>
              <TableHead>Materia</TableHead>
              <TableHead>Fecha Límite</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignmentsData.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {getStatusIcon(assignment.status)}
                      {assignment.title}
                    </div>
                    <div className="text-sm text-muted-foreground">{assignment.description}</div>
                  </div>
                </TableCell>
                <TableCell>{assignment.subject}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>
                  <CustomBadge variant={getStatusVariant(assignment.status)}>{assignment.status}</CustomBadge>
                </TableCell>
                <TableCell>
                  <CustomBadge variant={getPriorityVariant(assignment.priority)}>{assignment.priority}</CustomBadge>
                </TableCell>
                <TableCell>
                  {assignment.grade ? (
                    <span className="font-semibold text-green-600">{assignment.grade}</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button variant="ghost" size="sm">
                      Ver Detalles
                    </Button>
                    {assignment.status === "Pendiente" && (
                      <Button variant="outline" size="sm">
                        Entregar
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
