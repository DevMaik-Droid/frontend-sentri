import { type LucideIcon, ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { IconWrapper } from "../atomos/icon-wrapper";
import { CustomBadge } from "../atomos/custom-badge";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

interface MenuGrupo {
  titulo: string;
  items: MenuItems[];
}

export function ContenidoSidebar({ p_items } : { p_items: MenuGrupo[] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const isActive = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };
  return (
    <SidebarContent>
      {p_items?.map((it) => (
        <SidebarGroup key={it.titulo}>
          <SidebarGroupLabel>{it.titulo}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {it.items.map((sub_items) => (
                <React.Fragment key={sub_items.titulo}>
                  {sub_items.submenu ? (
                    <Collapsible
                      className="group/collapsible"
                      defaultOpen={isActive(sub_items.url)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton

                            tooltip={sub_items.titulo}
                            isActive={isActive(sub_items.url)}
                          >
                            <IconWrapper icon={sub_items.icon}></IconWrapper>
                            <span>{sub_items.titulo}</span>
                            {sub_items.badge && (
                              <CustomBadge
                                variant="secondary"
                                className="ml-auto"
                              >
                                {sub_items.badge}
                              </CustomBadge>
                            )}
                            <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {sub_items.submenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.titulo}>
                                <SidebarMenuSubButton
                                className="cursor-pointer"
                                  onClick={() => handleNavigation(subItem.url)}
                                  isActive={location.pathname === subItem.url}
                                >
                                  {subItem.titulo}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={isActive(sub_items.url)}
                        tooltip={sub_items.titulo}
                        onClick={() => handleNavigation(sub_items.url)}
                      >
                        <IconWrapper icon={sub_items.icon} />
                        <span>{sub_items.titulo}</span>
                        {sub_items.badge && (
                          <CustomBadge variant="secondary" className="ml-auto">
                            {sub_items.badge}
                          </CustomBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
