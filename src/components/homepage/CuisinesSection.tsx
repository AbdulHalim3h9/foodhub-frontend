import Link from "next/link";
import Image from "next/image";

interface Cuisine {
  id: string;
  name: string;
}

interface CuisinesSectionProps {
  cuisines: Cuisine[];
}

export function CuisinesSection({ cuisines }: CuisinesSectionProps) {
  if (!cuisines?.length) return null;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Explore Cuisines
            </h2>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Find exactly what you're craving
            </p>
          </div>
          <Link
            href="/browse"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline underline-offset-4 transition-all whitespace-nowrap"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cuisines.slice(0, 6).map((cuisine, index) => {
            const colors = [
              "bg-red-50 text-red-600",
              "bg-orange-50 text-orange-600",
              "bg-amber-50 text-amber-600",
              "bg-green-50 text-green-600",
              "bg-sky-50 text-sky-600",
              "bg-purple-50 text-purple-600",
            ];
            const icons = ["🍕", "🥟", "🍛", "🌮", "🍱", "🥗"];

            return (
              <Link
                key={cuisine.id}
                href={`/browse?cuisine=${cuisine.name}`}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 text-3xl ${colors[index % colors.length]} group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                >
                  {icons[index % icons.length]}
                </div>
                <h3 className="font-semibold text-gray-900 text-center text-sm md:text-base mt-2 group-hover:text-orange-600 transition-colors">
                  {cuisine.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
