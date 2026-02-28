import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface Category {
  id: string;
  name: string;
}

interface Cuisine {
  id: string;
  name: string;
}

interface FilterSidebarProps {
  categories?: Category[] | null;
  cuisines?: Cuisine[] | null;
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  selectedCuisine: string;
  onCuisineChange: (cuisine: string) => void;
  minPrice: string;
  onMinPriceChange: (price: string) => void;
  maxPrice: string;
  onMaxPriceChange: (price: string) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  categories,
  cuisines,
  selectedCategories,
  onCategoryToggle,
  selectedCuisine,
  onCuisineChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  onClearFilters,
}: FilterSidebarProps) {
  const safeCategories = categories ?? [];
  const safeCuisines = cuisines ?? [];
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 hidden lg:block overflow-hidden transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-7 sticky top-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2 text-gray-900">
            <Filter className="h-4 w-4 text-orange-500" /> Filters
          </h3>
          <button
            onClick={onClearFilters}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline transition-all"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Categories
          </h4>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {safeCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <Checkbox
                  id={`desktop-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryToggle(category.id)}
                  className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded-sm"
                />
                <label
                  htmlFor={`desktop-${category.id}`}
                  className="text-sm font-medium text-gray-600 group-hover:text-gray-900 leading-none cursor-pointer select-none transition-colors"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-100" />

        {/* Cuisine Filter */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Cuisine Type
          </h4>
          <Select value={selectedCuisine} onValueChange={onCuisineChange}>
            <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:ring-orange-500 rounded-xl h-11">
              <SelectValue placeholder="All Cuisines" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
              <SelectItem value="all">All Cuisines</SelectItem>
              {safeCuisines.map((cuisine) => (
                <SelectItem key={cuisine.id} value={cuisine.name}>
                  {cuisine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-gray-100" />

        {/* Price Range */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Price Range
          </h4>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="pl-7 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl h-11 no-spinners"
              />
            </div>
            <span className="text-gray-400 font-medium">-</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="pl-7 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl h-11 no-spinners"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
