export default function LoadingSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 animate-pulse space-y-3">
      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
}
