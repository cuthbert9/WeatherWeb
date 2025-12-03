"use client";

import { getWeatherIcon } from "@/uitls";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type HourlyItemData = {
  time: string;
  temp: number;
  weatherCode: number;
  fullTime: string;
};

type HourForecastProps = {
  isLoading: boolean;
  data?: HourlyItemData[];
};

const HourForecast = ({ isLoading, data }: HourForecastProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("Today");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get unique days from data
  const availableDays = useMemo(() => {
    if (!data) return [];
    const days = new Set<string>();
    const today = new Date().toDateString();

    data.forEach(item => {
      const date = new Date(item.fullTime);
      const dateString = date.toDateString();

      if (dateString === today) {
        days.add("Today");
      } else {
        days.add(date.toLocaleDateString('en-US', { weekday: 'long' }));
      }
    });

    return Array.from(days);
  }, [data]);

 
  const filteredData = useMemo(() => {
    if (!data) return [];

    const today = new Date().toDateString();

    return data.filter(item => {
      const date = new Date(item.fullTime);
      const dateString = date.toDateString();
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

      if (selectedDay === "Today") {
        return dateString === today;
      }
      return dayName === selectedDay;
    });
  }, [data, selectedDay]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update selected day when data changes (reset to Today)
  useEffect(() => {
    if (availableDays.length > 0 && !availableDays.includes(selectedDay)) {
      setSelectedDay("Today");
    }
  }, [availableDays]);

  const HourlyItem = ({
    weatherCode,
    time,
    temperature,
  }: {
    weatherCode: number;
    time: string;
    temperature: number;
  }) => (
    <div className="flex items-center justify-between w-full bg-[#2A2D43] px-4 rounded-xl shadow-sm flex-1 max-h-[70px]">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 relative">
          {getWeatherIcon(weatherCode, "w-full h-full text-yellow-400")}
        </div>
        <span className="text-gray-200 font-medium text-sm">{time}</span>
      </div>
      <span className="text-gray-200 font-semibold text-sm">{temperature}°</span>
    </div>
  );

  // Skeleton placeholder
  const SkeletonItem = () => (
    <div className="animate-pulse flex-1 w-full bg-gray-800 rounded-xl min-h-[50px]">

    </div>
  );

  return (
    <div className="bg-[#1C1F32] p-6 rounded-2xl w-full h-full flex flex-col relative">
      {/* Header with Dropdown */}
      <div className="flex justify-between items-center mb-4 z-20">
        <h3 className="text-gray-100 font-semibold text-lg">Hourly forecast</h3>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-lg transition-colors"
          >
            {selectedDay}
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-[#2A2D43] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
              {availableDays.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors
                    ${selectedDay === day ? 'text-white font-medium bg-white/10' : 'text-gray-400'}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 h-full overflow-hidden justify-between">
        {isLoading || !data
          ? [...Array(6)].map((_, i) => <SkeletonItem key={i} />)
          : filteredData.slice(0, 6).map((item, index) => (
            <HourlyItem
              key={index}
              weatherCode={item.weatherCode}
              time={item.time}
              temperature={item.temp}
            />
          ))}

        {/* Show message if no data for selected day (e.g. late night) */}
        {!isLoading && filteredData.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No hourly data available
          </div>
        )}
      </div>
    </div>
  );
};

export default HourForecast;
