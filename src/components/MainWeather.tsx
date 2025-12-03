import Image from "next/image";
import { Loader2 } from "lucide-react";

type MainWeatherCardProps = {
  city: string;
  country?: string;
  date: string;
  icon?: React.ReactNode;
  temperature?: number;
  isLoading?: boolean;
  unit?: string;
};

const MainWeatherCard = ({
  city,
  country,
  date,
  icon,
  temperature,
  isLoading,
  unit = "°C",
}: MainWeatherCardProps) => {
  // ... (loading state remains same)

  return (
    <div
      className="rounded-2xl p-6 text-white w-full h-auto md:h-[250px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
      style={{
        backgroundImage: 'url("/Images/bg-today-large.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-2xl md:text-xl font-semibold">
          {city}
          {country ? `, ${country}` : ""}
        </h2>
        <p className="text-sm opacity-90 mt-1">{date}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-[100px] h-[100px]">
          {icon}
        </div>
        <div className="text-6xl font-bold">{temperature}{unit}</div>
      </div>
    </div>
  );
};

export default MainWeatherCard;