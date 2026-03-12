"use client";

import {
  Book,
  Menu,
  Sunset,
  Trees,
  Zap,
  Utensils,
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  Settings,
  Package,
  LogOut,
  Layout,
} from "lucide-react";
import { getCategories } from "@/actions/category.action";
import { Category } from "@/services/category.service";
import { useState, useEffect } from "react";
import { getUser, logoutUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { getCartCount } from "@/actions/cart.action";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  className?: string;
}

const Navbar1 = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Browse Meals", url: "/browse" },
    {
      title: "Categories",
      url: "#",
      items: [
        {
          title: "Italian Cuisine",
          description: "Authentic pasta, pizza and more",
          icon: <Utensils className="size-5 shrink-0 text-orange-500" />,
          url: "/browse/category/italian",
        },
        {
          title: "Asian Food",
          description: "Chinese, Japanese, Thai delicacies",
          icon: <Utensils className="size-5 shrink-0 text-orange-500" />,
          url: "/browse/category/asian",
        },
        {
          title: "Fast Food",
          description: "Burgers, fries and quick meals",
          icon: <Utensils className="size-5 shrink-0 text-orange-500" />,
          url: "/browse/category/fast-food",
        },
        {
          title: "Healthy Options",
          description: "Salads, bowls and nutritious meals",
          icon: <Utensils className="size-5 shrink-0 text-orange-500" />,
          url: "/browse/category/healthy",
        },
      ],
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [session, setSession] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      setIsPending(true);
      try {
        const user = await getUser();
        if (user) {
          setSession({ user });
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setIsPending(false);
      }
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setSession(null);
    router.refresh();
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        if (result.success && result.data) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Create dynamic menu with categories and role-based items
  const dynamicMenu = (() => {
    let baseMenu = menu.map((item) => {
      if (item.title === "Categories") {
        // Replace hardcoded categories with backend categories
        return {
          ...item,
          items: categories.map((category) => ({
            title: category.name,
            description:
              category.description || `Explore ${category.name} dishes`,
            icon: <Utensils className="size-5 shrink-0 text-orange-500" />,
            url: `/browse/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`,
          })),
        };
      }
      return item;
    });

    // Add Dashboard item for admin and provider roles
    if (session?.user && (session.user as any).role !== "CUSTOMER") {
      // Insert Dashboard after "Home" and before "Browse Meals"
      const dashboardIndex = baseMenu.findIndex(
        (item) => item.title === "Browse Meals",
      );
      if (dashboardIndex > 0) {
        baseMenu.splice(dashboardIndex, 0, {
          title: "Dashboard",
          url: "/dashboard",
          icon: <Layout className="size-5 shrink-0 text-orange-500" />,
        });
      }
    }

    return baseMenu;
  })();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to browse page with search query
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };
  return (
    <section
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center justify-between py-4 gap-8">
          {/* Left Section: Brand + Navigation */}
          <div className="flex items-center gap-8">
            {/* Brand Title */}
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-orange-600 tracking-tight">
                FoodHub
              </span>
            </a>

            {/* Navigation Menu */}
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-1">
                {dynamicMenu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section: Search + Auth */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search restaurants, dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 w-64 h-9 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
              />
            </form>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              {/* Cart Icon - Only for customers */}
              {session?.user && (session.user as any).role === "CUSTOMER" && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 relative p-2"
                >
                  <a href="/cart" className="flex items-center">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </a>
                </Button>
              )}

              {isPending ? (
                <div className="h-9 w-24 bg-gray-100 animate-pulse rounded-md" />
              ) : session?.user ? (
                <div className="flex items-center gap-3">
                  {/* User Dropdown */}
                  <DropdownMenu
                    open={isUserDropdownOpen}
                    onOpenChange={setIsUserDropdownOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                      >
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          {session.user.image ? (
                            <img
                              src={session.user.image}
                              alt={session.user.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {session.user.name?.split(" ")[0]}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {/* User Info */}
                      <div className="px-2 py-2 border-b">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {session.user.image ? (
                              <img
                                src={session.user.image}
                                alt={session.user.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <User className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {session.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session.user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <DropdownMenuItem asChild>
                        <a href="/profile" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </a>
                      </DropdownMenuItem>

                      {/* Dashboard - Only for Admin and Provider */}
                      {session?.user &&
                        (session.user as any).role !== "CUSTOMER" && (
                          <DropdownMenuItem asChild>
                            <a
                              href="/dashboard"
                              className="flex items-center gap-2"
                            >
                              <Layout className="h-4 w-4" />
                              <span>Dashboard</span>
                            </a>
                          </DropdownMenuItem>
                        )}

                      <DropdownMenuItem asChild>
                        <a href="/orders" className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>My Orders</span>
                        </a>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 focus:text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <a href={auth.login.url}>{auth.login.title}</a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                  >
                    <a href={auth.signup.url}>{auth.signup.title}</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between py-3">
            {/* Brand Title */}
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-orange-600 tracking-tight">
                FoodHub
              </span>
            </a>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Icon - Only for customers */}
              {session?.user && (session.user as any).role === "CUSTOMER" && (
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 relative p-2"
                >
                  <a href="/cart" className="flex items-center">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </a>
                </Button>
              )}

              {/* Mobile Search Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Search className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>Search</SheetTitle>
                  </SheetHeader>
                  <form onSubmit={handleSearch} className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search restaurants, dishes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                    />
                  </form>
                </SheetContent>
              </Sheet>

              {/* Mobile Menu Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <span className="text-xl font-bold text-orange-600">
                        FoodHub
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-6">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-2"
                    >
                      {dynamicMenu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                      {isPending ? (
                        <div className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />
                      ) : session?.user ? (
                        <>
                          {/* User Info Section */}
                          <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-50 pb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                {session.user.image ? (
                                  <img
                                    src={session.user.image}
                                    alt={session.user.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="h-6 w-6 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <p className="text-orange-600 font-bold">
                                  {session.user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {session.user.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="space-y-2">
                            {/* Dashboard - Only for Admin and Provider */}
                            {session?.user &&
                              (session.user as any).role !== "CUSTOMER" && (
                                <Button
                                  asChild
                                  variant="outline"
                                  className="border-orange-200 text-orange-600 hover:bg-orange-50 w-full justify-start"
                                >
                                  <a
                                    href="/dashboard"
                                    className="flex items-center gap-2"
                                  >
                                    <Layout className="h-4 w-4" />
                                    <span>Dashboard</span>
                                  </a>
                                </Button>
                              )}

                            <Button
                              asChild
                              variant="outline"
                              className="border-orange-200 text-orange-600 hover:bg-orange-50 w-full justify-start"
                            >
                              <a
                                href="/profile"
                                className="flex items-center gap-2"
                              >
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                              </a>
                            </Button>

                            <Button
                              asChild
                              variant="outline"
                              className="border-orange-200 text-orange-600 hover:bg-orange-50 w-full justify-start"
                            >
                              <a
                                href="/orders"
                                className="flex items-center gap-2"
                              >
                                <Package className="h-4 w-4" />
                                <span>My Orders</span>
                              </a>
                            </Button>

                            <Button
                              onClick={handleLogout}
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50 w-full justify-start"
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              Logout
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Button
                            asChild
                            variant="outline"
                            className="border-orange-200 text-orange-600 hover:bg-orange-50"
                          >
                            <a href={auth.login.url}>{auth.login.title}</a>
                          </Button>
                          <Button
                            asChild
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            <a href={auth.signup.url}>{auth.signup.title}</a>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="h-9 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 data-[state=open]:bg-orange-50 data-[state=open]:text-orange-600">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white border border-gray-100 shadow-lg">
          <div className="p-2">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title}>
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b border-gray-100"
      >
        <AccordionTrigger className="text-base py-3 font-semibold text-gray-900 hover:text-orange-600 hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="pb-3">
          <div className="flex flex-col gap-1 pl-2">
            {item.items.map((subItem) => (
              <a
                key={subItem.title}
                href={subItem.url}
                className="flex items-start gap-3 rounded-md p-3 hover:bg-orange-50 transition-colors"
              >
                <div className="text-orange-500 mt-0.5">{subItem.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {subItem.title}
                  </div>
                  {subItem.description && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {subItem.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="text-base font-semibold text-gray-900 hover:text-orange-600 py-3 block transition-colors"
    >
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex items-start gap-4 rounded-md p-3 w-80 hover:bg-orange-50 transition-colors group"
      href={item.url}
    >
      <div className="text-orange-500 mt-0.5">{item.icon}</div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900 group-hover:text-orange-600">
          {item.title}
        </div>
        {item.description && (
          <p className="text-sm text-gray-500 mt-0.5 leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
