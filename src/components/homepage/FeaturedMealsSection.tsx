import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ShoppingBag } from "lucide-react";
import { Meal } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface FeaturedMealsProps {
  meals: Meal[];
}

export function FeaturedMealsSection({ meals }: FeaturedMealsProps) {
  if (!meals?.length) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Featured Meals
            </h2>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Hand-picked dishes from top local restaurants
            </p>
          </div>
          <Link
            href="/browse"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-4 transition-all"
          >
            See all meals &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {meals.slice(0, 4).map((meal) => (
            <div
              key={meal.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={
                    meal.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
                  }
                  alt={meal.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Gradient for readability if we added text, optional */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {meal.isFeatured && (
                    <Badge className="bg-orange-500/95 hover:bg-orange-600 backdrop-blur-sm shadow-sm border-none text-xs px-2.5 py-0.5">
                      Featured
                    </Badge>
                  )}
                  {meal.isVegan && (
                    <Badge className="bg-green-500/95 hover:bg-green-600 backdrop-blur-sm shadow-sm border-none text-xs px-2.5 py-0.5">
                      🌱 Vegan
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4 mb-1">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {meal.name}
                  </h3>
                  <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
                    {formatPrice(meal.price)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                  {meal.provider?.name || "Local Restaurant"}
                </p>

                <div className="mt-auto flex items-center justify-between text-sm text-gray-600 mb-5">
                  <div className="flex items-center gap-1.5 bg-yellow-50/50 px-2 py-1 rounded-md border border-yellow-100/50 text-gray-900">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">
                      {meal.reviews && meal.reviews.length > 0
                        ? (
                            meal.reviews.reduce(
                              (acc: number, review: any) => acc + review.rating,
                              0,
                            ) / meal.reviews.length
                          ).toFixed(1)
                        : "4.5"}
                    </span>
                    <span className="text-gray-400 text-xs ml-0.5">
                      ({meal.reviews?.length || 12})
                    </span>
                  </div>

                  {meal.prepTime && (
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                      <Clock className="h-4 w-4" />
                      <span>{meal.prepTime} min</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2 border-gray-200 text-gray-700 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 transition-colors rounded-xl h-11"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Order Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
