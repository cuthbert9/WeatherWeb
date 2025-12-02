type MetricCardProps = {
  title: string;
  value: string | number;
  isLoading?: boolean; // New prop to control loading state
};

export default function MetricCard({
  title,
  value,
  isLoading
}: MetricCardProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center w-full h-30">
        {/* Title Skeleton */}
        <h1>Feels like</h1>

        <h1>_</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center w-full h-30">
      <span className="text-sm text-gray-400">{title}</span>
      <span className="text-lg font-bold text-white mt-1">{value}</span>
    </div>
  );
}