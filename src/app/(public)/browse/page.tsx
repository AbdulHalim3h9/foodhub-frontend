"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMeals } from "@/actions/menu.action";
import { getCategories } from "@/actions/category.action";
import { Meal } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/browse/FilterSidebar";
import { MealCard } from "@/components/browse/MealCard";
import { BrowseHeader } from "@/components/browse/BrowseHeader";

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Initialize states from URL
  const initialCategory = searchParams.get("category");
  const initialCategories = searchParams.get("categories");
  const parsedCategories = initialCategories
    ? initialCategories.split(",")
    : initialCategory
      ? [initialCategory]
      : [];

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(parsedCategories);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [totalMeals, setTotalMeals] = useState(0);

  // Additional filter states (initialized from URL)
  const [selectedCuisine, setSelectedCuisine] = useState(
    searchParams.get("cuisine") || "all",
  );
  const [isVegan, setIsVegan] = useState(
    searchParams.get("isVegan") === "true",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [isAvailable, setIsAvailable] = useState(
    searchParams.get("isAvailable") !== "false",
  );

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories({});
        console.log("Categories API result:", result);
        if (result.success && result.data) {
          console.log("Categories data:", result.data);
          // Categories API returns { data: [...] } directly
          setCategories(result.data.data || []);
          console.log("Set categories to:", result.data.data);
        } else {
          console.error("Failed to fetch categories:", result.error);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch meals whenever filters change
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const queryParams: any = {
          limit: "12",
          page: "1",
        };

        // Add search term
        if (searchTerm) queryParams.search = searchTerm;

        // Add selected categories (multiple) - backend needs categoryId for single, but we can send comma-separated for multiple
        if (selectedCategories.length > 0) {
          queryParams.categoryIds = selectedCategories.join(",");
        }

        // Add other filters
        if (selectedCuisine && selectedCuisine !== "all")
          queryParams.cuisine = selectedCuisine;
        if (isVegan) queryParams.isVegan = true;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;
        if (isAvailable) queryParams.isAvailable = true;

        // Add URL params for persistence via router.replace
        const urlParams = new URLSearchParams();
        if (searchTerm) urlParams.set("search", searchTerm);
        if (selectedCategories.length > 0)
          urlParams.set("categories", selectedCategories.join(","));
        if (selectedCuisine && selectedCuisine !== "all")
          urlParams.set("cuisine", selectedCuisine);
        if (isVegan) urlParams.set("isVegan", "true");
        if (minPrice) urlParams.set("minPrice", minPrice);
        if (maxPrice) urlParams.set("maxPrice", maxPrice);
        if (!isAvailable) urlParams.set("isAvailable", "false");

        router.replace(`/browse?${urlParams.toString()}`, { scroll: false });

        const result = await getMeals(queryParams);
        if (result.success && result.data) {
          setMeals(result.data.data?.data || []);
          setTotalMeals(result.data.data?.total || 0);
        } else {
          console.error("Failed to fetch meals:", result.error);
        }
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [
    searchTerm,
    selectedCategories,
    selectedCuisine,
    isVegan,
    minPrice,
    maxPrice,
    isAvailable,
    router,
  ]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSelectedCuisine("all");
    setIsVegan(false);
    setMinPrice("");
    setMaxPrice("");
    setIsAvailable(true);
    router.push("/browse");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Debug Info */}
      <div className="bg-yellow-50 border-b border-yellow-200 p-2 text-xs">
        Debug: Categories loaded: {categories.length} | Selected:{" "}
        {selectedCategories.join(", ")}
      </div>

      <BrowseHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        onClearFilters={clearFilters}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          {/* Desktop Sidebar */}
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            selectedCuisine={selectedCuisine}
            onCuisineChange={setSelectedCuisine}
            isVegan={isVegan}
            onVeganChange={setIsVegan}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            isAvailable={isAvailable}
            onAvailableChange={setIsAvailable}
            onClearFilters={clearFilters}
          />

          {/* Main Content Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {totalMeals}
                </span>{" "}
                results
                {selectedCategories.length > 0 && (
                  <span className="text-sm text-muted-foreground ml-2">
                    for {selectedCategories.length}{" "}
                    {selectedCategories.length === 1
                      ? "category"
                      : "categories"}
                  </span>
                )}
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

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading meals...</p>
              </div>
            ) : meals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {meals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No meals found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
