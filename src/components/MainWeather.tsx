import Image from "next/image";
import { Loader2 } from "lucide-react"; // Optional: for a nicer spinner, or use built-in dots

type MainWeatherCardProps = {
  city: string;
  country?: string;
  date: string;
  icon?: React.ReactNode; // Made optional during loading
  temperature?: number;   // Made optional during loading
  isLoading?: boolean;
};

const MainWeatherCard = ({
  city,
  country,
  date,
  icon,
  temperature,
  isLoading ,
}: MainWeatherCardProps) => {
  if (isLoading) {
    return (
      <div
        className="relative bg-gray-800 rounded-2xl p-6 text-white w-full h-[250px] max-w-2xl flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden"
       
      >
    
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
          </div>
          <span className="ml-3 text-white text-sm opacity-80">Loading...</span>
        </div>
      </div>
    );
  }

 
  return (
    <div
      className="rounded-2xl p-6 text-white w-full h-[250px] max-w-2xl flex flex-col md:flex-row items-center justify-between gap-4"
      style={{
        backgroundImage: 'url("/Images/bg-today-large.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <h2 className="text-xl font-semibold">
          {city}
          {country ? `, ${country}` : ""}
        </h2>
        <p className="text-sm opacity-90">{date}</p>
      </div>

      <div className="flex items-center gap-6">
        {icon || <Image src="/Images/icon-sunny.webp" alt="Weather icon" width={100} height={100} />}
        <div className="text-6xl font-bold">{temperature}°</div>
      </div>
    </div>
  );
};

export default MainWeatherCard;