import { mealService } from "@/services/meal.service";
import { categoryService } from "@/services/category.service";
import { cuisineService } from "@/services/cuisine.service";
// import { HeroSection, SearchSection, CategoriesSection, FeaturedMealsSection, WhyChooseUsSection } from "@/components/homepage/index";
import {
  HeroSection,
  SearchSection,
  CategoriesSection,
  CuisinesSection,
  FeaturedMealsSection,
  WhyChooseUsSection,
} from "@/components/homepage";

export default async function Home() {
  const featuredMealsPromise = mealService.getMeals({ isFeatured: true });
  const allMealsPromise = mealService.getMeals(
    { limit: "4" },
    { revalidate: 10 },
  );
  const categoriesPromise = categoryService.getCategories(
    {},
    { revalidate: 3600 },
  );
  const cuisinesPromise = cuisineService.getCuisines({}, { revalidate: 3600 });

  const [featuredMeals, allMeals, categoriesResult, cuisinesResult] =
    await Promise.all([
      featuredMealsPromise,
      allMealsPromise,
      categoriesPromise,
      cuisinesPromise,
    ]);

  const categories = categoriesResult?.data || [];
  const cuisines = cuisinesResult?.data || [];
  const featured = featuredMeals?.data
    ? Array.isArray(featuredMeals.data)
      ? featuredMeals.data
      : featuredMeals.data.data
    : [];

  return (
    <div className="flex flex-col">
      <HeroSection />
      <SearchSection />
      <FeaturedMealsSection meals={featured} />
      <CuisinesSection cuisines={cuisines} />
      <CategoriesSection categories={categories} />
      <WhyChooseUsSection />
    </div>
  );
}
