import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "../organismos/app-sidebar"
import { DashboardHeader } from "../organismos/dashboard-header"
import { StudentAttendanceContent } from "../organismos/student/student-attendance-content"

export function StudentAttendanceView() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Registro de Asistencia</h2>
              <p className="text-sm text-muted-foreground">Control y seguimiento de asistencia estudiantil</p>
            </div>
            <StudentAttendanceContent />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
