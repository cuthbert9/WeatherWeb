import React from "react";

type DailyForecastCardProps = {
  day: string;
  icon: React.ReactNode;
  high: number;
  low: number;
  isLoading?: boolean; 
};

export default function DailyForecastCard({
  day,
  icon,
  high,
  low,
  isLoading = false,
}: DailyForecastCardProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center w-28 h-35">

      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center w-28 h-35">
      <span className="text-sm text-gray-400">{day}</span>
      <div className="my-2">{icon}</div>
      <span className="text-sm text-white">
        {high}° / <span className="text-gray-400">{low}°</span>
      </span>
    </div>
  );
}