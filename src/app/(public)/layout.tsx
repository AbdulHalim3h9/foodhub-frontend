import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              FoodHub
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/browse" className="text-gray-600 hover:text-orange-500 transition-colors">
                Browse
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-orange-500 transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-4">FoodHub</h3>
              <p className="text-gray-300">
                Discover and order delicious meals from local providers in your area.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/browse" className="text-gray-300 hover:text-orange-500 transition-colors">Browse Meals</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-orange-500 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2">
                <li><Link href="/register" className="text-gray-300 hover:text-orange-500 transition-colors">Join as Provider</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Provider Login</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 FoodHub. All rights reserved. Made with ❤️ for food lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
