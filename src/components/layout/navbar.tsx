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
} from "lucide-react";
import { useState, useEffect } from "react";

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
      title: "Top Providers",
      url: "#",
      items: [
        {
          title: "Featured Restaurants",
          description: "Highest rated providers in your area",
          icon: <Sunset className="size-5 shrink-0 text-orange-500" />,
          url: "/browse",
        },
        {
          title: "New Providers",
          description: "Recently joined restaurants",
          icon: <Trees className="size-5 shrink-0 text-orange-500" />,
          url: "/browse",
        },
        {
          title: "Local Favorites",
          description: "Community loved restaurants",
          icon: <Zap className="size-5 shrink-0 text-orange-500" />,
          url: "/browse",
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
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
                {menu.map((item) => renderMenuItem(item))}
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
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
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
