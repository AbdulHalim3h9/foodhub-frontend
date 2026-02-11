export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold">FoodHub</div>
            <div className="space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="/browse" className="text-gray-600 hover:text-gray-900">Browse</a>
              <a href="/logout" className="text-red-600 hover:text-red-900">Logout</a>
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
