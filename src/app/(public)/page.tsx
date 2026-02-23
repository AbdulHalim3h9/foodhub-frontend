import { mealService } from "@/services/meal.service";
import { categoryService } from "@/services/category.service";
// import { HeroSection, SearchSection, CategoriesSection, FeaturedMealsSection, WhyChooseUsSection } from "@/components/homepage/index";
import { HeroSection, SearchSection, CategoriesSection, FeaturedMealsSection, WhyChooseUsSection } from "@/components/homepage";

export default async function Home() {
  const featuredMealsPromise = mealService.getMeals({ isFeatured: true });
  const allMealsPromise = mealService.getMeals(
    { limit: "4" },
    { revalidate: 10 },
  );
  const categoriesPromise = categoryService.getCategories({}, { revalidate: 3600 });

  const [featuredMeals, allMeals, categoriesResult] = await Promise.all([
    featuredMealsPromise,
    allMealsPromise,
    categoriesPromise,
  ]);

  const categories = categoriesResult?.data || [];
  const featured = featuredMeals?.data?.data || [];

  return (
    <div className="flex flex-col">
      <HeroSection />
      <SearchSection />
      <FeaturedMealsSection meals={featured} />
      <CategoriesSection categories={categories} />
      <WhyChooseUsSection />
    </div>
  );
}