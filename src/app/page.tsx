'use client'
import Image from "next/image";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { EmptyState } from "@/components/EmptyState";
import DailyForecastCard from "@/components/DailyForecast";
import MainWeatherCard from "@/components/MainWeather";
import MetricCard from "@/components/MerticCard";
import HourForecast from "@/components/HourForecast";
import ApiError from "@/components/ApiError";
import { WeatherProvider, useWeather } from "@/Context";
import { getWeatherIcon } from "@/uitls";
import { useEffect } from "react";

function WeatherContent() {
  const { weatherData, isLoading, error, units } = useWeather();

  if (error) {
    return (
      <div className="h-full flex flex-col mx-auto p-6 md:p-12">
        <Header />
        <ApiError
          message={error}
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }


  useEffect(()=>{
    console.log("Weather Data:", weatherData);
  },[weatherData])


  return (
    <div className="h-full flex flex-col mx-4 md:mx-auto p-4 md:p-12 max-w-7xl">
      <Header />

      <main className="flex flex-col items-center w-full max-w-3xl mx-auto mt-10 md:mt-30 gap-6 md:gap-8 my-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center ">
          How&apos;s the sky looking today?
        </h1>
        <SearchForm />
        {!weatherData && !isLoading && <EmptyState />}
      </main>

      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 mx-auto w-full">
          <div className="md:col-span-2 my-2 mb-4">
            <MainWeatherCard
              city={weatherData.location.city}
              country={weatherData.location.country}
              date={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              icon={getWeatherIcon(weatherData.current.weatherCode, "w-full h-full text-yellow-400")}
              temperature={weatherData.current.temp}
              isLoading={isLoading}
              unit={units.temperature === "celsius" ? "°C" : "°F"}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-6">
              <MetricCard title="Wind" value={`${weatherData.current.windSpeed} ${units.windSpeed === "kmh" ? "km/h" : "mph"}`} isLoading={isLoading} />
              <MetricCard title="Humidity" value={`${weatherData.current.humidity}%`} isLoading={isLoading} />
              <MetricCard title="Feels Like" value={`${weatherData.current.feelsLike}°`} isLoading={isLoading} />
              <MetricCard title="Condition" value={weatherData.current.condition} isLoading={isLoading} />
            </div>
            <h1 className="text-lg">Daily forecast</h1>
            <div className="grid grid-cols-3 md:flex gap-4 my-6">
              {weatherData.forecast.daily.map((day, index) => (
                <DailyForecastCard
                  key={index}
                  day={day.day}
                  icon={getWeatherIcon(day.weatherCode, "w-[50px] h-[50px] text-yellow-400")}
                  high={day.tempMax}
                  low={day.tempMin}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 mb-10">
            <HourForecast
              isLoading={isLoading}
              data={weatherData.forecast.hourly}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <WeatherProvider>
      <WeatherContent />
    </WeatherProvider>
  );
}

