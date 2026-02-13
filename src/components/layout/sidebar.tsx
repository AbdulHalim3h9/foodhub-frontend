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
  Shield,
  Package,
  ChefHat,
  Menu,
  X,
  MapPin,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  logo: {
    src: string;
    alt: string;
    title: string;
    description: string;
  };
  navGroups: NavGroup[];
  footerGroup: NavGroup;
  type: "admin" | "provider" | "customer";
};

const getSidebarData = (
  type: "admin" | "provider" | "customer",
): SidebarData => {
  const commonLogo = {
    src: "https://deifkwefumgah.cloudfront.net/foodhub/block/logos/foodhub-wordmark.svg",
    alt: "FoodHub",
    title: "FoodHub",
    description:
      type === "admin"
        ? "Admin Panel"
        : type === "provider"
          ? "Provider Portal"
          : "Customer Hub",
  };

  if (type === "admin") {
    return {
      logo: commonLogo,
      navGroups: [
        {
          title: "Main",
          items: [
            {
              label: "Dashboard",
              icon: LayoutDashboard,
              href: "/admin",
              isActive: true,
            },
            { label: "Providers", icon: Store, href: "/admin/providers" },
            { label: "Users", icon: Users, href: "/admin/users" },
          ],
        },
        {
          title: "Analytics",
          items: [
            { label: "Reports", icon: BarChart3, href: "/admin/reports" },
            {
              label: "Transactions",
              icon: FileText,
              href: "/admin/transactions",
            },
          ],
        },
      ],
      footerGroup: {
        title: "System",
        items: [
          { label: "Settings", icon: Settings, href: "/admin/settings" },
          { label: "Support", icon: HelpCircle, href: "/admin/help" },
        ],
      },
      type: "admin",
    };
  } else if (type === "provider") {
    return {
      logo: commonLogo,
      navGroups: [
        {
          title: "Overview",
          items: [
            {
              label: "Dashboard",
              icon: LayoutDashboard,
              href: "/provider/dashboard",
              isActive: true,
            },
            { label: "Orders", icon: ShoppingCart, href: "/provider/orders" },
            { label: "Menu Items", icon: Menu, href: "/provider/menu" },
          ],
        },
        {
          title: "Performance",
          items: [
            {
              label: "Analytics",
              icon: TrendingUp,
              href: "/provider/analytics",
            },
            { label: "Reviews", icon: Star, href: "/provider/reviews" },
          ],
        },
      ],
      footerGroup: {
        title: "Account",
        items: [
          { label: "Settings", icon: Settings, href: "/provider/settings" },
          { label: "Help", icon: HelpCircle, href: "/provider/help" },
        ],
      },
      type: "provider",
    };
  } else {
    // Customer
    return {
      logo: commonLogo,
      navGroups: [
        {
          title: "My FoodHub",
          items: [
            { label: "Browse", icon: Store, href: "/browse", isActive: true },
            {
              label: "My Orders",
              icon: ShoppingCart,
              href: "/customer/orders",
            },
            { label: "Favorites", icon: Star, href: "/customer/favorites" },
          ],
        },
        {
          title: "Account",
          items: [
            { label: "Profile", icon: Users, href: "/customer/profile" },
            { label: "Addresses", icon: MapPin, href: "/customer/addresses" },
          ],
        },
      ],
      footerGroup: {
        title: "Support",
        items: [
          { label: "Help Center", icon: HelpCircle, href: "/help" },
          { label: "Settings", icon: Settings, href: "/customer/settings" },
        ],
      },
      type: "customer",
    };
  }
};

const SidebarLogo = ({ logo }: { logo: SidebarData["logo"] }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary">
            <img
              src={logo.src}
              alt={logo.alt}
              className="size-6 text-primary-foreground invert dark:invert-0"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">{logo.title}</span>
            <span className="text-xs text-muted-foreground">
              {logo.description}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({
  type = "provider",
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  type?: "admin" | "provider" | "customer";
}) => {
  const sidebarData = getSidebarData(type);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarLogo logo={sidebarData.logo} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.href}>{item.label}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarData.footerGroup.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.footerGroup.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>{item.label}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

interface Sidebar1Props {
  className?: string;
  type?: "admin" | "provider" | "customer";
  children?: React.ReactNode;
}

const Sidebar1 = ({
  className,
  type = "provider",
  children,
}: Sidebar1Props) => {
  return (
    <SidebarProvider className={cn(className)}>
      <AppSidebar type={type} />
      <SidebarInset className="overflow-x-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Overview</BreadcrumbLink>
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
