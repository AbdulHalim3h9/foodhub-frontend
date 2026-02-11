import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    description: "Traditional stir-fried rice noodles with chicken, peanuts, and lime",
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
    description: "Juicy beef patty with lettuce, tomato, onion, and special sauce",
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
    description: "Fresh romaine lettuce with parmesan, croutons, and caesar dressing",
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
    description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
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
    <a
      href={link}
      className="block h-full w-full max-w-md transition-opacity hover:opacity-80"
    >
      <Card className="h-full overflow-hidden p-0 hover:shadow-lg transition-shadow">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
          {badge && (
            <Badge
              style={{
                backgroundColor: badge.color,
              }}
              className="absolute start-4 top-4 text-white"
            >
              {badge.text}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-3 pb-6">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-gray-900">{name}</CardTitle>
            {rating && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-orange-500">★</span>
                <span className="text-gray-600">{rating}</span>
              </div>
            )}
          </div>
          
          {provider && (
            <p className="text-sm text-orange-600 font-medium">{provider}</p>
          )}
          
          <CardDescription className="text-sm text-gray-600 line-clamp-2">
            {description}
          </CardDescription>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {category && <span>{category}</span>}
          </div>
          
          <div className="mt-auto">
            <Price onSale={sale != null} className="text-lg font-semibold text-orange-600">
              <PriceValue price={sale} currency={currency} variant="sale" />
              <PriceValue
                price={regular}
                currency={currency}
                variant="regular"
              />
            </Price>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export { FoodList1 };
