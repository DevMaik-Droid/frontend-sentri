import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "../organismos/AppSidebar"
import { DashboardHeader } from "../organismos/AppNavbar"
import { StudentRecordsContent } from "../organismos/student/student-records-content"

export function StudentRecordsView() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Expedientes Estudiantiles</h2>
              <p className="text-sm text-muted-foreground">Documentación y seguimiento académico</p>
            </div>
            <StudentRecordsContent />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
