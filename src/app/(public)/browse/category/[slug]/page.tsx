import { FoodList1, FoodList } from "@/components/food-list";

const CATEGORY_FOODS: Record<string, FoodList> = {
  italian: [
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
      name: "Fettuccine Alfredo",
      image: {
        src: "https://images.unsplash.com/photo-1563298721-dc7b178c1f0b?w=400",
        alt: "Fettuccine Alfredo",
      },
      link: "/browse/meal/fettuccine-alfredo",
      description: "Creamy pasta with parmesan cheese and butter sauce",
      price: {
        regular: 14.99,
        currency: "USD",
      },
      rating: 4.4,
      category: "Italian",
      provider: "Mario's Pizza",
    },
  ],
  asian: [
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
      name: "Vegetable Spring Rolls",
      image: {
        src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab04d6?w=400",
        alt: "Vegetable Spring Rolls",
      },
      link: "/browse/meal/vegetable-spring-rolls",
      description: "Crispy rolls filled with fresh vegetables and served with sweet chili sauce",
      price: {
        regular: 8.99,
        currency: "USD",
      },
      rating: 4.3,
      category: "Asian",
      provider: "Bangkok Kitchen",
    },
  ],
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryFoods = CATEGORY_FOODS[params.slug] || [];
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {categoryName} Cuisine
            </h1>
            <p className="text-lg text-gray-600">
              Authentic {categoryName} dishes from local restaurants
            </p>
          </div>
        </div>
      </section>

      {/* Food List */}
      {categoryFoods.length > 0 ? (
        <FoodList1 foods={categoryFoods} />
      ) : (
        <section className="py-16">
          <div className="text-center">
            <p className="text-gray-500">No {categoryName} dishes available at the moment.</p>
          </div>
        </section>
      )}
    </div>
  );
}
