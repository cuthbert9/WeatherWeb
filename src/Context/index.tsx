"use client";

import React, { createContext, useContext, useState, ReactNode,useEffect } from "react";
import { WeatherData, formatWeatherData } from "@/uitls";

export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "inch";

interface Units {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  units: Units;
  setUnit: (type: keyof Units, value: string) => void;
  fetchWeather: (city?: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });
  const [lastCity, setLastCity] = useState<string>("");

  const setUnit = (type: keyof Units, value: string) => {
    setUnits((prev) => ({ ...prev, [type]: value }));
  };

  // Effect to refetch when units change, if we have a city
  useEffect(() => {
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, [units]);

  const fetchWeather = async (city?: string) => {
    const searchCity = city || lastCity;
    if (!searchCity) return;

    // Update lastCity if a new city is provided
    if (city) setLastCity(city);

    setIsLoading(true);
    setError(null);
    try {
      // 1. Geocoding to get lat/lon
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Fetch Weather Data with Units
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${units.temperature}&windspeed_unit=${units.windSpeed}&precipitation_unit=${units.precipitation}`
      );
      const weatherRawData = await weatherRes.json();

      // 3. Format Data
      const formattedData = formatWeatherData(weatherRawData, name);

      // Add country to location
      formattedData.location.country = country;

      setWeatherData(formattedData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, isLoading, error, units, setUnit, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
