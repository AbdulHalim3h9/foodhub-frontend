"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Sparkles,
  Star,
  Clock,
  MapPin,
  ChevronDown,
  ShoppingBag,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// Mock Data
const categories = [
  { id: "all", name: "All", count: 120 },
  { id: "pizza", name: "Pizza", count: 45 },
  { id: "burger", name: "Burger", count: 32 },
  { id: "asian", name: "Asian", count: 28 },
  { id: "sushi", name: "Sushi", count: 15 },
  { id: "dessert", name: "Dessert", count: 12 },
  { id: "healthy", name: "Healthy", count: 20 },
];

const meals = [
  {
    id: 1,
    name: "Truffle Mushroom Burger",
    restaurant: "Burger House",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=500&auto=format&fit=crop&q=60",
    price: 18.99,
    rating: 4.8,
    reviews: 124,
    time: "20-30 min",
    delivery: 0,
    tags: ["Burger", "Gourmet"],
    isNew: true,
  },
  {
    id: 2,
    name: "Classic Margherita Pizza",
    restaurant: "Luigi's Italian",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60",
    price: 14.5,
    rating: 4.6,
    reviews: 89,
    time: "30-40 min",
    delivery: 2.99,
    tags: ["Pizza", "Italian"],
  },
  {
    id: 3,
    name: "Spicy Tuna Roll",
    restaurant: "Sushi Master",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
    price: 12.99,
    rating: 4.9,
    reviews: 215,
    time: "25-35 min",
    delivery: 1.49,
    tags: ["Sushi", "Japanese"],
    promoted: true,
  },
  {
    id: 4,
    name: "Chicken Pad Thai",
    restaurant: "Thai Spice",
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&auto=format&fit=crop&q=60",
    price: 15.99,
    rating: 4.7,
    reviews: 156,
    time: "35-45 min",
    delivery: 0,
    tags: ["Asian", "Thai"],
  },
  {
    id: 5,
    name: "Avocado Toast & Poached Egg",
    restaurant: "Brunch Spot",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=500&auto=format&fit=crop&q=60",
    price: 11.5,
    rating: 4.5,
    reviews: 67,
    time: "15-25 min",
    delivery: 2.5,
    tags: ["Breakfast", "Healthy"],
  },
  {
    id: 6,
    name: "Double Cheese Smashburger",
    restaurant: "Burger Joint",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=60",
    price: 13.99,
    rating: 4.4,
    reviews: 92,
    time: "20-30 min",
    delivery: 1.99,
    tags: ["Burger", "Fast Food"],
  },
  {
    id: 7,
    name: "Grilled Salmon Salad",
    restaurant: "Fresh & Green",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    price: 19.99,
    rating: 4.9,
    reviews: 45,
    time: "25-35 min",
    delivery: 0,
    tags: ["Healthy", "Seafood"],
  },
  {
    id: 8,
    name: "Chocolate Lava Cake",
    restaurant: "Sweet Tooth",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&auto=format&fit=crop&q=60",
    price: 8.5,
    rating: 4.8,
    reviews: 112,
    time: "15-20 min",
    delivery: 3.99,
    tags: ["Dessert", "Sweet"],
  },
];

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for restaurants, cuisine, or a dish..."
                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.slice(0, 5).map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-full h-11 whitespace-nowrap"
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* Mobile Filter Content - simplified version of Sidebar */}
                  <div>
                    <h3 className="font-semibold mb-4">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={
                            selectedCategory === cat.id ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(cat.id)}
                          className="justify-start"
                        >
                          {cat.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </h3>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Categories
                </p>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`
                           w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center
                           ${selectedCategory === cat.id ? "bg-orange-50 text-orange-700 font-medium" : "text-gray-600 hover:bg-gray-100"}
                        `}
                  >
                    {cat.name}
                    <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Sort By
              </p>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="delivery_time">Delivery Time</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
              <h4 className="font-semibold text-orange-800 mb-2">
                Free Delivery!
              </h4>
              <p className="text-sm text-orange-700/80 mb-3">
                Get free delivery on orders over $30.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-orange-200 text-orange-700 hover:bg-orange-100"
              >
                Learn More
              </Button>
            </div>
          </aside>

          {/* Main Content Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {meals.length}
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Sort by:
                </span>
                <Select defaultValue="recommended">
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <Card
                  key={meal.id}
                  className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    {meal.isNew && (
                      <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                        New
                      </Badge>
                    )}
                    {meal.promoted && (
                      <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
                        Sponsored
                      </Badge>
                    )}

                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge
                        variant="secondary"
                        className="backdrop-blur-md bg-white/90 text-xs font-medium"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {meal.time}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                          {meal.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {meal.restaurant}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-lg">
                          ${meal.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-gray-900">
                          {meal.rating}
                        </span>
                        <span className="text-xs">({meal.reviews})</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <span
                        className={
                          meal.delivery === 0
                            ? "text-green-600 font-medium"
                            : ""
                        }
                      >
                        {meal.delivery === 0
                          ? "Free Delivery"
                          : `$${meal.delivery.toFixed(2)} Delivery`}
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {meal.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full gap-2 group-hover:bg-orange-600 transition-colors">
                      <ShoppingBag className="h-4 w-4" />
                      Add to Order
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
