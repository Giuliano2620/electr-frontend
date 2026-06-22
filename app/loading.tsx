export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-2xl p-5">
            <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-3 w-full bg-gray-100 rounded mb-3 animate-pulse" />
            <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}