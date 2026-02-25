"use client";

import * as React from "react";
import {
  BarChart3,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Users,
  ShoppingCart,
  Store,
  TrendingUp,
  FileText,
  Star,
  MapPin,
  Menu,
  SquareTerminal,
  LogOut,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Navigation Data grouped by Role

const ADMIN_navMain = [
  {
    title: "Main Dashboard",
    icon: LayoutDashboard,
    items: [
      { title: "Overview", url: "/dashboard" },
      { title: "Providers", url: "/dashboard/providers" },
      { title: "Users", url: "/dashboard/users" },
      { title: "Orders", url: "/dashboard/orders" },
    ],
  },
];

const PROVIDER_navMain = [
  {
    title: "Store Overview",
    icon: Store,
    items: [
      { title: "Dashboard", url: "/dashboard" },
      { title: "Analytics", url: "/dashboard/analytics" },
      { title: "Menu Items", url: "/dashboard/menu" },
      { title: "Orders", url: "/dashboard/orders" },
      { title: "Profile", url: "/dashboard/profile" },
      { title: "Settings", url: "/dashboard/settings" },
    ],
  },
];

const CUSTOMER_navMain = [
  {
    title: "My FoodHub",
    icon: ShoppingCart,
    items: [
      //dashboard
      { title: "Dashboard", url: "/dashboard" },
      { title: "Cart", url: "/dashboard/cart" },
      { title: "Order History", url: "/dashboard/orders" },
      //settings
      { title: "Profile", url: "/dashboard/profile" },
      { title: "Settings", url: "/dashboard/settings" },
      //profile
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: "ADMIN" | "PROVIDER" | "CUSTOMER";
}

// Simple NavMain component to render the grouped items
function NavMain({ items }: { items: any[] }) {
  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel className="flex items-center gap-2">
            {group.icon && <group.icon className="h-4 w-4" />}
            {group.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item: any) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  let navItems = null;
  if (userRole === "ADMIN") {
    navItems = ADMIN_navMain;
  } else if (userRole === "PROVIDER") {
    navItems = PROVIDER_navMain;
  } else {
    navItems = CUSTOMER_navMain;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                  <Store className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-lg">FoodHub</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {userRole.toLowerCase()} Panel
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

interface Sidebar1Props {
  className?: string;
  type?: "ADMIN" | "PROVIDER" | "CUSTOMER" | "admin" | "provider" | "customer";
  children?: React.ReactNode;
}

const Sidebar1 = ({
  className,
  type = "PROVIDER",
  children,
}: Sidebar1Props) => {
  // Normalize type to uppercase to handle existing layouts
  const role = type.toUpperCase() as "ADMIN" | "PROVIDER" | "CUSTOMER";

  return (
    <SidebarProvider className={cn(className)}>
      <AppSidebar userRole={role} />
      <SidebarInset className="overflow-x-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {role.charAt(0) + role.slice(1).toLowerCase()} Portal
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Sidebar1 };
