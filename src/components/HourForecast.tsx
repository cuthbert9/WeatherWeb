import { WiDayCloudy, WiCloud, WiDaySunny, WiRain, WiSnow } from "react-icons/wi";
import Image from "next/image";

type HourForecastProps = {
  isLoading: boolean;
};

const HourForecast = ({ isLoading }: HourForecastProps) => {

  const HourlyItem = ({
    icon,
    time,
    temperature,
  }: {
    icon: React.ReactNode;
    time: string;
    temperature: number;
  }) => (
    <div className="flex items-center justify-between w-full bg-[#2A2D43] p-4 rounded-xl shadow-sm ">
      <div className="flex items-center gap-3">
        <span className="text-2xl text-gray-200">{icon}</span>
        <span className="text-gray-200 font-medium">{time}</span>
      </div>
      <span className="text-gray-200 font-semibold">{temperature}°</span>
    </div>
  );

  // Skeleton placeholder
  const SkeletonItem = () => (
    <div className="animate-pulse h-12 flex items-center justify-between w-full bg-gray-800 p-4 rounded-xl">
    
    </div>
  );

  const hourlyData = [
    { time: "3 PM", temp: 68, icon: <Image src="/Images/icon-rain.webp" alt="Sunny Icon" width={20} height={20} /> },
    { time: "4 PM", temp: 68, icon: <Image src="/Images/icon-storm.webp" alt="Sunny Icon" width={20} height={20} /> },
    { time: "5 PM", temp: 68, icon: <Image src="/Images/icon-snow.webp" alt="Sunny Icon" width={20} height={20} /> },
    { time: "6 PM", temp: 66, icon: <Image src="/Images/icon-snow.webp" alt="Sunny Icon" width={20} height={20} /> },
    { time: "7 PM", temp: 66, icon: <Image src="/Images/icon-sunny.webp" alt="Sunny Icon" width={20} height={20} /> },
    { time: "8 PM", temp: 64, icon: <Image src="/Images/icon-snow.webp" alt="Sunny Icon" width={20} height={20} /> },
    { time: "9 PM", temp: 63, icon: <Image src="/Images/icon-snow.webp" alt="Sunny Icon" width={20} height={20} /> },
    { time: "10 PM", temp: 63, icon: <Image src="/Images/icon-snow.webp" alt="Sunny Icon" width={20} height={20} /> },
  ];

  return (
    <div className="bg-[#1C1F32] p-6 rounded-2xl w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-100 font-semibold text-lg">Hourly forecast</h3>


        {
            isLoading?          (  <div className="w-20 h-6 bg-gray-800 rounded-lg animate-pulse">
              
            </div>):(
                     <select className="bg-[#2A2D43] text-gray-200 p-2 rounded-lg text-sm outline-none border-none">
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
            )

        }

      
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {isLoading
          ? [...Array(8)].map((_, i) => <SkeletonItem key={i} />)
          : hourlyData.map((item, index) => (
              <HourlyItem
                key={index}
                icon={item.icon}
                time={item.time}
                temperature={item.temp}
              />
            ))}
      </div>
    </div>
  );
};

export default HourForecast;
