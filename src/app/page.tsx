'use client'
import Image from "next/image";
import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { EmptyState } from "@/components/EmptyState";
import { useEffect } from "react";
import DailyForecastCard from "@/components/DailyForecast";
import MainWeatherCard from "@/components/MainWeather";
import { WiDaySunny, WiRain, WiCloud } from "react-icons/wi";
import MetricCard from "@/components/MerticCard";
import HourForecast from "@/components/HourForecast";
import ApiError from "@/components/ApiError";

export default function Home() {

  const [data, setData] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);



  // const getWeather = async (lat: number, lon: number) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
  //       `&current_weather=true&hourly=temperature_2m,precipitation,weathercode&timezone=auto`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch weather data");
  //     }

  //     const data = await response.json();
  //     console.log("Weather data:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching weather:", error);
  //     throw error;
  //   }
  // }


  // useEffect(() => {
  //   getWeather(37.7749, -122.4194);
  // }, []);






  if (error) {
    return (<div className="h-full flex  flex-col mx-auto p-6 md:p-12">

      <Header />
      <ApiError
        message="Unable to fetch weather data. Please try again."
        onRetry={() => setError(false)}
      />

    </div>


    )

  }


  return (
    <div className="h-full flex flex-col mx-4 md:mx-auto p-4 md:p-12 max-w-7xl">
      <Header />


      <main className="flex flex-col items-center w-full max-w-3xl mx-auto mt-10 md:mt-30 gap-6 md:gap-8 my-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center ">
          How&apos;s the sky looking today?
        </h1>
        <SearchForm />
        {
          !data && (

            <EmptyState />
          )
        }

      </main>
      {
        data && (

          <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 mx-auto w-full">

            <div className="  md:col-span-2 my-2 mb-4 ">
              <MainWeatherCard
                city="San Francisco"
                country="US"
                date="Monday, Sep 25"
                icon={<WiDaySunny />}
                temperature={68}
                isLoading={isloading}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-6">
                {[1, 2, 3, 4].map((card, index) => (
                  <MetricCard key={index} title="Humidity" value="72%" isLoading={isloading} />
                ))}

              </div>
              <h1 className="text-lg ">Daily forecast</h1>
              <div className="grid grid-cols-3 md:flex gap-4 my-6">
                {
                  [1, 2, 3, 4, 5, 6, 7].map((card) => (
                    <DailyForecastCard
                      day="Mon"
                      icon={
                        <Image src="/Images/icon-rain.webp" alt="Sunny Icon" width={100} height={100} />}
                      high={70}
                      low={55}
                      isLoading={isloading}
                    />
                  ))
                }
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-2 mb-4 ">
              <HourForecast isLoading={isloading} />
            </div>
          </div>

        )
      }
    </div>
  );
}
