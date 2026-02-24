export default function EditMenuItem({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Edit Menu Item</h1>
      <p className="mt-4 text-lg text-gray-600">
        Edit menu item: {params.id}
      </p>
    </div>
  );
}
