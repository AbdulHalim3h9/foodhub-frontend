export default function EmptyDetails() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-zinc-400">
      <div className="text-6xl mb-4">📋</div>
      <p className="text-lg font-medium mb-2">No Order Selected</p>
      <p className="text-sm text-zinc-500">Click any order from the list to view details</p>
    </div>
  );
}
