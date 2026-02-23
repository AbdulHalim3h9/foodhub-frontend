import { Search, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";

interface Category {
  id: string;
  name: string;
}

interface BrowseHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  onClearFilters: () => void;
}

export function BrowseHeader({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
}: BrowseHeaderProps) {
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for restaurants, cuisine, or a dish..."
              className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-orange-500 focus:border-orange-500 rounded-full transition-all text-base lg:text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar pt-1 md:pt-0">
            <Button
              variant={selectedCategories.length === 0 ? "default" : "outline"}
              className={`rounded-full h-10 whitespace-nowrap font-medium transition-all ${
                selectedCategories.length === 0
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 border-gray-200"
              }`}
              onClick={onClearFilters}
            >
              All
            </Button>
            {categories.slice(0, 5).map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`rounded-full h-10 whitespace-nowrap font-medium transition-all ${
                    isSelected
                      ? "bg-orange-500 text-white hover:bg-orange-600 border-transparent shadow-sm"
                      : "text-gray-600 hover:text-gray-900 border-gray-200"
                  }`}
                  onClick={() => onCategoryToggle(category.id)}
                >
                  {isSelected && <Check className="w-4 h-4 mr-1.5" />}
                  {category.name}
                </Button>
              );
            })}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="h-10 md:hidden w-full sm:w-auto rounded-xl border-gray-200 text-gray-700 font-semibold"
              >
                <Filter className="h-4 w-4 mr-2 text-orange-500" />
                Filters
                {selectedCategories.length > 0 && (
                  <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left font-bold text-xl">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-6">
                {/* Mobile Filter Content - Just Categories for now as per original */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={`mobile-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => onCategoryToggle(category.id)}
                          className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 h-5 w-5"
                        />
                        <label
                          htmlFor={`mobile-${category.id}`}
                          className="text-sm font-medium text-gray-700 leading-none cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
