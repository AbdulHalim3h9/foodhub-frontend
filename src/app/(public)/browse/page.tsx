import { FoodList1 } from "@/components/food-list";

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Delicious Meals
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover amazing food from local providers
            </p>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {["All", "Italian", "Asian", "Fast Food", "Healthy", "Japanese"].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Food List */}
      <FoodList1 />
      
      {/* Load More Section */}
      <section className="bg-white py-12">
        <div className="text-center">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
            Load More Meals
          </button>
        </div>
      </section>
    </div>
  );
}
