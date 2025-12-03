import React from "react";
import Image from "next/image";
export interface WeatherData {
    current: {
        temp: number;
        humidity: number;
        windSpeed: number;
        feelsLike: number;
        condition: string;
        weatherCode: number;
        description: string;
    };
    forecast: {
        daily: Array<{
            day: string;
            tempMax: number;
            tempMin: number;
            weatherCode: number;
            condition: string;
        }>;
        hourly: Array<{
            time: string;
            temp: number;
            weatherCode: number;
            fullTime: string;
        }>;
    };
    location: {
        city: string;
        country: string;
    };
}



export const getWeatherIcon = (code: number, className?: string) => {
    
    let iconSrc = "/Images/icon-sunny.webp"; // fallback
    
    if (code === 0) iconSrc = "/Images/icon-sunny.webp";
    else if (code >= 1 && code <= 3) iconSrc = "/Images/icon-partly-cloudy.webp";
    else if (code >= 45 && code <= 48) iconSrc = "/Images/icon-fog.webp";
    else if (code >= 51 && code <= 67) iconSrc = "/Images/icon-drizzle.webp";
    else if (code >= 71 && code <= 77) iconSrc = "/Images/icon-snow.webp";
    else if (code >= 80 && code <= 82) iconSrc = "/Images/icon-rain.webp";
    else if (code >= 95 && code <= 99) iconSrc = "/Images/icon-storm.webp";

    return (
        <Image
            src={iconSrc}
            alt="weather icon"
            width={60}
            height={60}
            className={className || "w-10 h-10 object-contain"}
        />
    );
};


export const formatWeatherData = (data: any, city: string): WeatherData => {
    const getWeatherDescription = (code: number) => {
        if (code === 0) return "Clear sky";
        if (code >= 1 && code <= 3) return "Partly cloudy";
        if (code >= 45 && code <= 48) return "Foggy";
        if (code >= 51 && code <= 67) return "Rainy";
        if (code >= 71 && code <= 77) return "Snowy";
        if (code >= 80 && code <= 82) return "Heavy rain";
        if (code >= 95 && code <= 99) return "Thunderstorm";
        return "Unknown";
    };

    return {
        current: {
            temp: Math.round(data.current_weather.temperature),
            humidity: 0,
            windSpeed: Math.round(data.current_weather.windspeed),
            feelsLike: Math.round(data.current_weather.temperature),
            condition: getWeatherDescription(data.current_weather.weathercode),
            weatherCode: data.current_weather.weathercode,
            description: getWeatherDescription(data.current_weather.weathercode),
        },
        forecast: {
            daily: data.daily.time.map((time: string, index: number) => {
                return {
                    day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
                    tempMax: Math.round(data.daily.temperature_2m_max[index]),
                    tempMin: Math.round(data.daily.temperature_2m_min[index]),
                    weatherCode: data.daily.weathercode[index],
                    condition: getWeatherDescription(data.daily.weathercode[index]),
                };
            }),
            hourly: data.hourly.time.map((time: string, index: number) => {
                return {
                    time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
                    temp: Math.round(data.hourly.temperature_2m[index]),
                    weatherCode: data.hourly.weathercode[index],
                    fullTime: time, // Keep original ISO string for filtering
                };
            }),
        },
        location: {
            city: city,
            country: "",
        },
    };
};
