import type { LucideIcon } from "lucide-react";

interface MenuItems {
  titulo: string;
  url: string;
  icon: LucideIcon;
  badge?: string;
  submenu?: {
    titulo: string;
    url: string;
  }[];
}

export interface MenuGrupo {
  titulo: string;
  items: MenuItems[];
}