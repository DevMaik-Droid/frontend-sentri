import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { StudentSidebar } from "../organismos/student/student-sidebar"
import { StudentHeader } from "../organismos/student/student-header"
import { StudentMetricsGrid } from "../organismos/student/student-metrics-grid"
import { StudentSubjectsTable } from "../organismos/student/student-subjects-table"
import { StudentAssignmentsTable } from "../organismos/student/student-assignments-table"
import { StudentGradesOverview } from "../organismos/student/student-grades-overview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export function StudentDashboardLayout() {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>
        <StudentHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Mi Dashboard</h2>
              <p className="text-sm text-muted-foreground">Bienvenida, Ana García</p>
            </div>

            <StudentMetricsGrid />

            {/* Sección de gráficos de calificaciones */}
            <StudentGradesOverview />

            {/* Tabs para diferentes secciones */}
            <Tabs defaultValue="subjects" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 md:w-auto">
                <TabsTrigger value="subjects">Mis Materias</TabsTrigger>
                <TabsTrigger value="assignments">Tareas y Actividades</TabsTrigger>
              </TabsList>
              <TabsContent value="subjects" className="mt-4">
                <StudentSubjectsTable />
              </TabsContent>
              <TabsContent value="assignments" className="mt-4">
                <StudentAssignmentsTable />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
