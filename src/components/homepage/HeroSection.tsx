import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface HeroSectionProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function HeroSection({ searchTerm = "", onSearchChange }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white text-center">
          <div className="flex items-center gap-2">
            <Star className="size-5 fill-white" />
            <p className="text-base md:text-lg font-semibold">
              Sign up for free delivery on your first order
            </p>
          </div>
          <Button size="sm" className="bg-white text-orange-600 hover:bg-orange-50">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
