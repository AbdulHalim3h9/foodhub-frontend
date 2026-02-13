import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star, ShoppingBag, MapPin } from "lucide-react";

interface FoodPrice {
  regular: number;
  sale?: number;
  currency: string;
}

interface Food {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  description: string;
  price: FoodPrice;
  badge?: {
    text: string;
    color?: string;
  };
  rating?: number;
  category?: string;
  provider?: string;
}

type FoodCardProps = Food;

export type FoodList = Array<Food>;

const FOODS_LIST: FoodList = [
  {
    name: "Margherita Pizza",
    image: {
      src: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
      alt: "Margherita Pizza",
    },
    link: "/browse/meal/margherita-pizza",
    description: "Fresh mozzarella, basil, and tomato sauce on crispy dough",
    price: {
      regular: 12.99,
      currency: "USD",
    },
    badge: {
      text: "Bestseller",
      color: "#f97316",
    },
    rating: 4.5,
    category: "Italian",
    provider: "Mario's Pizza",
  },
  {
    name: "Chicken Pad Thai",
    image: {
      src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
      alt: "Chicken Pad Thai",
    },
    link: "/browse/meal/chicken-pad-thai",
    description:
      "Traditional stir-fried rice noodles with chicken, peanuts, and lime",
    price: {
      regular: 14.99,
      currency: "USD",
    },
    rating: 4.7,
    category: "Asian",
    provider: "Bangkok Kitchen",
  },
  {
    name: "Classic Burger",
    image: {
      src: "https://images.unsplash.com/photo-1568901346375-23c44588c66c?w=400",
      alt: "Classic Burger",
    },
    link: "/browse/meal/classic-burger",
    description:
      "Juicy beef patty with lettuce, tomato, onion, and special sauce",
    price: {
      regular: 10.99,
      currency: "USD",
    },
    badge: {
      text: "Popular",
      color: "#f97316",
    },
    rating: 4.3,
    category: "Fast Food",
    provider: "Burger House",
  },
  {
    name: "Caesar Salad",
    image: {
      src: "https://images.unsplash.com/photo-1550304943-0f7545e30a46?w=400",
      alt: "Caesar Salad",
    },
    link: "/browse/meal/caesar-salad",
    description:
      "Fresh romaine lettuce with parmesan, croutons, and caesar dressing",
    price: {
      regular: 8.99,
      currency: "USD",
    },
    rating: 4.2,
    category: "Healthy",
    provider: "Green Garden",
  },
  {
    name: "Sushi Platter",
    image: {
      src: "https://images.unsplash.com/photo-1579584429535-c5d09f5c8c7e?w=400",
      alt: "Sushi Platter",
    },
    link: "/browse/meal/sushi-platter",
    description: "Assorted fresh sushi with salmon, tuna, and vegetarian rolls",
    price: {
      regular: 24.99,
      currency: "USD",
    },
    badge: {
      text: "Premium",
      color: "#f97316",
    },
    rating: 4.8,
    category: "Japanese",
    provider: "Sakura Sushi",
  },
  {
    name: "Vegan Buddha Bowl",
    image: {
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      alt: "Vegan Buddha Bowl",
    },
    link: "/browse/meal/vegan-buddha-bowl",
    description:
      "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
    price: {
      regular: 11.99,
      currency: "USD",
    },
    rating: 4.6,
    category: "Healthy",
    provider: "Green Garden",
  },
];

interface FoodList1Props {
  className?: string;
  foods?: FoodList;
}

const FoodList1 = ({ className, foods = FOODS_LIST }: FoodList1Props) => {
  return (
    <section className={cn("py-8", className)}>
      <div className="container">
        <div className="grid place-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
          {foods.map((item, index) => (
            <FoodCard key={`food-list-1-card-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FoodCard = ({
  name,
  description,
  link,
  image,
  badge,
  price,
  rating,
  category,
  provider,
}: FoodCardProps) => {
  const { regular, sale, currency } = price;

  return (
    <Card className="group h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <a href={link} className="block w-full h-full">
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </a>
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 transition-colors z-10">
          <Heart className="h-4 w-4" />
        </button>
        {badge && (
          <Badge
            className="absolute top-3 left-3 text-white border-none"
            style={{ backgroundColor: badge.color || "#f97316" }}
          >
            {badge.text}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <a
              href={link}
              className="hover:underline decoration-orange-500/30 underline-offset-4"
            >
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                {name}
              </h3>
            </a>
            {provider && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {provider}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span className="font-bold text-lg">
              {sale ? (
                <span className="flex flex-col items-end">
                  <span className="text-red-500">
                    {currency === "USD" ? "$" : currency}
                    {sale.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through font-normal">
                    {currency === "USD" ? "$" : currency}
                    {regular.toFixed(2)}
                  </span>
                </span>
              ) : (
                <span>
                  {currency === "USD" ? "$" : currency}
                  {regular.toFixed(2)}
                </span>
              )}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3 min-h-[40px]">
          {description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-gray-900">{rating}</span>
            </div>
          )}
          {category && (
            <Badge variant="secondary" className="font-normal text-xs">
              {category}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2 group-hover:bg-orange-600 transition-colors">
          <ShoppingBag className="h-4 w-4" />
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export { FoodList1 };
