"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchSectionProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function SearchSection({
  searchTerm = "",
  onSearchChange,
}: SearchSectionProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    onSearchChange?.(value);
  };

  return (
    <section className="bg-white pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Delicious Food Delivered{" "}
            <span className="text-orange-600">Fast & Fresh</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Order from your favorite restaurants and get delivery in minutes
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              className="pl-12 pr-4 h-14 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              value={localSearchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
