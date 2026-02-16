import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  ChefHat,
  Truck,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white text-center">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-white" />
              <p className="text-base md:text-lg font-semibold">
                Sign up for free delivery on your first order
              </p>
            </div>
            <Link href="/signup">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-orange-600 hover:bg-orange-50 font-semibold"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for food or restaurants..."
                  className="pl-9 pr-4 h-12 bg-white shadow-sm border-gray-300 focus-visible:ring-primary"
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-md hover:shadow-lg transition-all"
              >
                Find Food
              </Button>
            </div>
            <div className="flex items-center gap-6 justify-center mt-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary" /> 30 min Delivery
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" /> Secure Payment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Featured Meals
            </h2>
            <p className="text-muted-foreground">
              Handpicked delicious meals from top providers near you.
            </p>
          </div>
          <Link href="/browse">
            <Button variant="outline" className="gap-2 group">
              View All Meals{" "}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Margherita Pizza",
              image:
                "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800",
              price: "$12.99",
              rating: 4.8,
              time: "20-30 min",
            },
            {
              name: "Chicken Pad Thai",
              image:
                "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
              price: "$14.99",
              rating: 4.7,
              time: "25-40 min",
            },
            {
              name: "Classic Burger",
              image:
                "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=800",
              price: "$10.99",
              rating: 4.5,
              time: "15-25 min",
            },
            {
              name: "Caesar Salad",
              image:
                "https://images.unsplash.com/photo-1550304943-0f7545e30a46?w=800",
              price: "$8.99",
              rating: 4.6,
              time: "10-20 min",
            },
          ].map((meal, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={meal.image}
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                  <Star className="size-3 text-orange-500 fill-orange-500" />{" "}
                  {meal.rating}
                </div>
              </div>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">{meal.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Clock className="size-3" /> {meal.time} • Free Delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-primary">
                    {meal.price}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="hover:bg-primary hover:text-white transition-colors"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section with clean grid */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Explore by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Whatever you're craving, we have it. Explore our wide range of
              cuisines.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Italian", icon: "🍕", color: "bg-red-50 text-red-600" },
              {
                name: "Chinese",
                icon: "🥟",
                color: "bg-orange-50 text-orange-600",
              },
              {
                name: "Indian",
                icon: "🍛",
                color: "bg-yellow-50 text-yellow-600",
              },
              {
                name: "Mexican",
                icon: "🌮",
                color: "bg-green-50 text-green-600",
              },
              {
                name: "Japanese",
                icon: "🍱",
                color: "bg-pink-50 text-pink-600",
              },
              {
                name: "Healthy",
                icon: "🥗",
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/browse/category/${category.name.toLowerCase()}`}
                className="group relative"
              >
                <Card className="h-full border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center p-6 text-center cursor-pointer">
                  <div
                    className={`text-4xl mb-3 p-4 rounded-full ${category.color} transition-colors group-hover:scale-110 duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Providers / Why Choose Us Mix */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1000&q=80"
              alt="Chef Cooking"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Partner with the Best</h3>
              <p className="text-white/80">
                We collaborate with top-rated local chefs and restaurants to
                bring you quality food.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-primary text-primary"
              >
                Why FoodHub?
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We Deliver More Than Just Food
              </h2>
              <p className="text-muted-foreground text-lg">
                Our mission is to bring joy to your table with every meal. Here
                is why thousands of customers choose us daily.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Fast Delivery",
                  desc: "Experience super-fast delivery times.",
                  icon: <Truck className="size-6 text-primary" />,
                },
                {
                  title: "Professional Chefs",
                  desc: "Dishes prepared by top-tier chefs.",
                  icon: <ChefHat className="size-6 text-primary" />,
                },
                {
                  title: "Fresh Ingredients",
                  desc: "We ensure only the freshest ingredients are used.",
                  icon: <UtensilsIcon className="size-6 text-primary" />,
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl hover:bg-orange-50/50 transition-colors border border-transparent hover:border-orange-100"
                >
                  <div className="bg-orange-100 p-3 rounded-lg h-fit">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/signup">
                <Button size="lg" className="px-8 text-lg">
                  Join Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-primary rounded-3xl p-12 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to order?</h2>
            <p className="text-primary-foreground/90 text-xl">
              Browse our menu and get your favorite meals delivered in minutes.
            </p>
            <Link href="/browse">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                Start Ordering Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple icon wrapper for the map
function UtensilsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}