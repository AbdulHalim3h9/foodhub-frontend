import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover & Order Delicious Meals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              From local favorites to new culinary adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/browse" 
                className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Meals
              </Link>
              <Link 
                href="/register" 
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-colors"
              >
                Join as Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Meals
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked delicious meals from top providers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Delicious Meal {item}</h3>
                  <p className="text-gray-600 text-sm mb-2">Authentic local cuisine</p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 font-bold">$12.99</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/browse" 
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              View All Meals
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're craving
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Italian', icon: '🍕' },
              { name: 'Chinese', icon: '🥟' },
              { name: 'Indian', icon: '🍛' },
              { name: 'Mexican', icon: '🌮' },
              { name: 'Japanese', icon: '🍱' },
              { name: 'American', icon: '🍔' }
            ].map((category) => (
              <Link 
                key={category.name}
                href={`/browse/category/${category.name.toLowerCase()}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Providers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Providers
            </h2>
            <p className="text-lg text-gray-600">
              Trusted local restaurants and food vendors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((provider) => (
              <div key={provider} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Restaurant {provider}</h3>
                  <p className="text-gray-600 mb-4">Authentic local cuisine • Fast delivery</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">4.{8 - provider}</span>
                      <span className="text-sm text-gray-500 ml-2">(200+ reviews)</span>
                    </div>
                    <Link 
                      href={`/browse/provider/restaurant-${provider}`}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      View Menu →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/browse" 
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
            >
              All Providers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
