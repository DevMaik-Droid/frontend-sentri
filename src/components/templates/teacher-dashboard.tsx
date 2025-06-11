import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { TeacherSidebar } from "../organismos/teacher/teacher-sidebar"
import { TeacherHeader } from "../organismos/teacher/teacher-header"
import { TeacherMetricsGrid } from "../organismos/teacher/teacher-metrics-grid"
import { TeacherSubjectsTable } from "../organismos/teacher/teacher-subjects-table"
import { TeacherStudentsTable } from "../organismos/teacher/teacher-students-table"
import { GradesManagement } from "../organismos/grades-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export function TeacherDashboardLayout() {
  return (
    <SidebarProvider>
      <TeacherSidebar />
      <SidebarInset>
        <TeacherHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Panel Docente</h2>
              <p className="text-sm text-muted-foreground">Bienvenido, Dr. Roberto Méndez</p>
            </div>

            <TeacherMetricsGrid />

            {/* Tabs para diferentes secciones */}
            <Tabs defaultValue="subjects" className="mt-6">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="subjects">Mis Materias</TabsTrigger>
                <TabsTrigger value="students">Estudiantes</TabsTrigger>
                <TabsTrigger value="grades">Calificaciones</TabsTrigger>
              </TabsList>
              <TabsContent value="subjects" className="mt-4">
                <TeacherSubjectsTable />
              </TabsContent>
              <TabsContent value="students" className="mt-4">
                <TeacherStudentsTable />
              </TabsContent>
              <TabsContent value="grades" className="mt-4">
                <GradesManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
