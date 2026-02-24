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
import { getCuisines } from "@/actions/cuisine.action";
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

interface Cuisine {
  id: string;
  name: string;
}

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);

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
  // console.log(totalMeals, "totalMeals");
  // Additional filter states (initialized from URL)
  const [selectedCuisine, setSelectedCuisine] = useState(
    searchParams.get("cuisine") || "all",
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Fetch categories and cuisines on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResult, cuisinesResult] = await Promise.all([
          getCategories({}),
          getCuisines({}),
        ]);

        if (categoriesResult.success && categoriesResult.data) {
          setCategories(categoriesResult.data.data || []);
        }

        if (cuisinesResult.success && cuisinesResult.data) {
          setCuisines(cuisinesResult.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch meals when filters change
  useEffect(() => {
    const fetchMealsData = async () => {
      setLoading(true);
      try {
        const queryParams: any = {
          limit: "12",
          page: "1",
        };

        if (searchTerm) queryParams.search = searchTerm;
        if (selectedCategories.length > 0) {
          queryParams.categoryIds = selectedCategories.join(",");
        }
        if (selectedCuisine && selectedCuisine !== "all")
          queryParams.cuisine = selectedCuisine;
        if (minPrice) queryParams.minPrice = minPrice;
        if (maxPrice) queryParams.maxPrice = maxPrice;

        const result = await getMeals(queryParams);
        if (result.success && result.data) {
          setMeals(result.data.data?.data || []);
          setTotalMeals(result.data.data?.total || 0);
        }
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsData();
  }, [searchTerm, selectedCategories, selectedCuisine, minPrice, maxPrice]);

  // Sync URL with state (one-way sync State -> URL)
  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (searchTerm) urlParams.set("search", searchTerm);
    if (selectedCategories.length > 0)
      urlParams.set("categories", selectedCategories.join(","));
    if (selectedCuisine && selectedCuisine !== "all")
      urlParams.set("cuisine", selectedCuisine);
    if (minPrice) urlParams.set("minPrice", minPrice);
    if (maxPrice) urlParams.set("maxPrice", maxPrice);

    const newSearch = urlParams.toString();
    const currentSearch = searchParams.toString();

    // Use a string comparison to avoid loops while still keeping persistence
    if (newSearch !== currentSearch) {
      router.replace(`/browse${newSearch ? "?" + newSearch : ""}`, {
        scroll: false,
      });
    }
  }, [searchTerm, selectedCategories, selectedCuisine, minPrice, maxPrice]);

  // Sync State from URL (for back button or manual URL change)
  useEffect(() => {
    const currentCategories = searchParams.get("categories")?.split(",") || [];
    const currentSearch = searchParams.get("search") || "";
    const currentCuisine = searchParams.get("cuisine") || "all";
    const currentMinPrice = searchParams.get("minPrice") || "";
    const currentMaxPrice = searchParams.get("maxPrice") || "";

    // Update only if different from current state to avoid unnecessary re-renders
    if (
      JSON.stringify(currentCategories) !== JSON.stringify(selectedCategories)
    )
      setSelectedCategories(currentCategories);
    if (currentSearch !== searchTerm) setSearchTerm(currentSearch);
    if (currentCuisine !== selectedCuisine) setSelectedCuisine(currentCuisine);
    if (currentMinPrice !== minPrice) setMinPrice(currentMinPrice);
    if (currentMaxPrice !== maxPrice) setMaxPrice(currentMaxPrice);
  }, [searchParams]);

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
    // Clear all states
    setSelectedCategories([]);
    setSearchTerm("");
    setSelectedCuisine("all");
    setMinPrice("");
    setMaxPrice("");
    // Just push the clean URL
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
            cuisines={cuisines}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            selectedCuisine={selectedCuisine}
            onCuisineChange={setSelectedCuisine}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
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
