import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Clock, MapPin, Star, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Meal } from "@/types";

interface MealCardProps {
  meal: Meal;
  formatPrice: (price: number) => string;
}

export function MealCard({ meal, formatPrice }: MealCardProps) {
  return (
    <Card className="group overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl flex flex-col bg-white">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-50">
        <Image
          src={
            meal.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
          }
          alt={meal.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all shadow-sm z-10">
          <Heart className="h-4 w-4" />
        </button>

        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {meal.isFeatured && (
            <Badge className="bg-orange-500/95 hover:bg-orange-600 backdrop-blur-sm shadow-sm border-none text-xs px-2.5 py-0.5 rounded-lg">
              Featured
            </Badge>
          )}
          {meal.isVegan && (
            <Badge className="bg-green-500/95 hover:bg-green-600 backdrop-blur-sm shadow-sm border-none text-xs px-2.5 py-0.5 rounded-lg">
              🌱 Vegan
            </Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 flex gap-2 z-10">
          <Badge
            variant="secondary"
            className="backdrop-blur-md bg-white/95 text-gray-700 text-xs font-semibold px-2 py-1 border-none shadow-sm rounded-lg"
          >
            <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
            {meal.prepTime ? `${meal.prepTime} min` : "20-30 min"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1 gap-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 leading-tight mb-1">
              {meal.name}
            </h3>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
              <MapPin className="h-3 w-3" />{" "}
              {meal.provider?.name || "Local Restaurant"}
            </p>
          </div>
          <div className="text-right">
            <span className="font-extrabold text-lg text-gray-900 whitespace-nowrap">
              {formatPrice(meal.price)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
          <div className="flex items-center gap-1.5 bg-yellow-50/50 px-2 py-1 rounded-md border border-yellow-100/50 text-gray-900">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-sm">
              {meal.reviews && meal.reviews.length > 0
                ? (
                    meal.reviews.reduce(
                      (acc: number, review: any) => acc + review.rating,
                      0,
                    ) / meal.reviews.length
                  ).toFixed(1)
                : "4.5"}
            </span>
            {meal.reviews && meal.reviews.length > 0 ? (
              <span className="text-gray-400 text-xs ml-0.5">
                ({meal.reviews.length})
              </span>
            ) : (
              <span className="text-gray-400 text-xs ml-0.5">(12)</span>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          {meal.cuisine && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 font-medium border border-gray-100">
              {meal.cuisine}
            </span>
          )}
          {meal.category?.name && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 font-medium border border-gray-100">
              {meal.category.name}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Button
          variant="outline"
          className="w-full gap-2 border-gray-200 text-gray-700 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 transition-colors rounded-xl h-11 font-semibold"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
}
