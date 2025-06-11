import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "../organismos/app-sidebar"
import { DashboardHeader } from "../organismos/dashboard-header"
import { StudentListContent } from "../organismos/student/student-list-content"

export function StudentListView() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Lista de Estudiantes</h2>
              <p className="text-sm text-muted-foreground">Gestión completa de estudiantes</p>
            </div>
            <StudentListContent />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
