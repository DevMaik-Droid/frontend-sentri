import { MetricsGrid } from "../organismos/metrics-grid"
import { StudentsTable } from "../organismos/students-table"
import { TeachersTable } from "../organismos/teachers-table"
import { CoursesTable } from "../organismos/courses-table"
import { StatisticsDashboard } from "../organismos/statistics-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"


export function MainAdmin() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Sección de métricas */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Panel de Control</h2>
            <MetricsGrid />

            {/* Sección de estadísticas */}
            <StatisticsDashboard />

            {/* Tabs para diferentes secciones */}
            <Tabs defaultValue="students" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="students">Estudiantes</TabsTrigger>
                <TabsTrigger value="teachers">Docentes</TabsTrigger>
                <TabsTrigger value="courses">Materias y Cursos</TabsTrigger>
              </TabsList>
              <TabsContent value="students" className="mt-4">
                <StudentsTable />
              </TabsContent>
              <TabsContent value="teachers" className="mt-4">
                <TeachersTable />
              </TabsContent>
              <TabsContent value="courses" className="mt-4">
                <CoursesTable />
              </TabsContent>
            </Tabs>
          </div>
        </div>
  )
}
