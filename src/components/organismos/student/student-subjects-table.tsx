import { Eye, FileText, Users } from "lucide-react"
import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { Progress } from "../../ui/progress"

const studentSubjectsData = [
  {
    id: "MAT001",
    name: "Programación Orientada a Objetos",
    code: "POO-101",
    teacher: "Dr. Roberto Méndez",
    schedule: "Lun-Mie-Vie 8:00-10:00",
    grade: 8.5,
    attendance: 95,
    progress: 75,
    status: "En curso",
  },
  {
    id: "MAT002",
    name: "Cálculo Diferencial",
    code: "MAT-201",
    teacher: "Dra. Claudia Vázquez",
    schedule: "Mar-Jue 10:00-12:00",
    grade: 9.0,
    attendance: 88,
    progress: 80,
    status: "En curso",
  },
  {
    id: "MAT003",
    name: "Inglés Técnico",
    code: "ING-101",
    teacher: "Mtro. Fernando Ruiz",
    schedule: "Lun-Mie 14:00-16:00",
    grade: 8.8,
    attendance: 92,
    progress: 70,
    status: "En curso",
  },
  {
    id: "MAT004",
    name: "Base de Datos",
    code: "BD-201",
    teacher: "Dra. Patricia Soto",
    schedule: "Vie 16:00-18:00",
    grade: 7.5,
    attendance: 85,
    progress: 65,
    status: "En curso",
  },
  {
    id: "MAT005",
    name: "Metodología de la Investigación",
    code: "MI-101",
    teacher: "Dr. Luis Hernández",
    schedule: "Sáb 8:00-10:00",
    grade: 9.2,
    attendance: 100,
    progress: 85,
    status: "En curso",
  },
]

export function StudentSubjectsTable() {
  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "text-green-600"
    if (grade >= 8) return "text-blue-600"
    if (grade >= 7) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mis Materias</CardTitle>
            <CardDescription>Materias del semestre actual</CardDescription>
          </div>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Ver Horario Completo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Materia</TableHead>
              <TableHead>Docente</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead>Asistencia</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentSubjectsData.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{subject.name}</div>
                    <div className="text-sm text-muted-foreground">{subject.code}</div>
                  </div>
                </TableCell>
                <TableCell>{subject.teacher}</TableCell>
                <TableCell className="text-sm">{subject.schedule}</TableCell>
                <TableCell>
                  <span className={`font-semibold ${getGradeColor(subject.grade)}`}>{subject.grade}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{subject.attendance}%</span>
                    <Progress value={subject.attendance} className="w-16 h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{subject.progress}%</span>
                    <Progress value={subject.progress} className="w-16 h-2" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Users className="h-4 w-4" />
                    </Button>
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
