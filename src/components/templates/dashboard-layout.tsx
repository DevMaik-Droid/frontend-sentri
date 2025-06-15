import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../organismos/AppSidebar";
import { DashboardHeader } from "../organismos/AppNavbar";
import type { MenuGrupo } from "../../types/sidebar-menu";
import type { AppNavbarProps } from "../../types/navbar-props";
import { Outlet } from "react-router-dom";
type DashboardLayoutProps = {
  sidebarMenu: MenuGrupo[];
  navbaritems: AppNavbarProps;
};

export function DashboardLayout({
  sidebarMenu,
  navbaritems,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar sidebarMenu={sidebarMenu} />
      <SidebarInset>
        <DashboardHeader {...navbaritems} />
        <main className="flex-1 overflow-auto p-4"><Outlet/></main>
      </SidebarInset>
    </SidebarProvider>
  );
}
