"use client";

import { Sun, Settings, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useWeather } from "@/Context";

export function Header() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { units, setUnit } = useWeather();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleSystem = () => {
        if (units.temperature === "celsius") {
            setUnit("temperature", "fahrenheit");
            setUnit("windSpeed", "mph");
            setUnit("precipitation", "inch");
        } else {
            setUnit("temperature", "celsius");
            setUnit("windSpeed", "kmh");
            setUnit("precipitation", "mm");
        }
    };

    return (
        <header className="flex justify-between items-center w-full relative">
            <div className="flex items-center gap-2">
                <Sun className="w-8 h-8 text-orange-400 fill-orange-400" />
                <span className="text-xl font-bold tracking-tight">Weather Now</span>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 
                               transition-colors px-4 py-2 rounded-lg text-sm font-medium"
                >
                    <Settings className="w-4 h-4" />
                    Units
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </button>

                {open && (
                    <div className="absolute right-0 top-14 w-56 bg-[#1C1F32] border border-white/10 rounded-xl p-3 shadow-xl text-sm z-50
                                    animate-in fade-in zoom-in duration-150 space-y-3">
                        <button
                            onClick={toggleSystem}
                            className="w-full text-left px-2 py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-200 font-medium mb-2"
                        >
                            Switch to {units.temperature === "celsius" ? "Imperial" : "Metric"}
                        </button>

                        <div className="font-semibold text-gray-300">Temperature</div>
                        <Option
                            label="Celsius (°C)"
                            selected={units.temperature === "celsius"}
                            onClick={() => setUnit("temperature", "celsius")}
                        />
                        <Option
                            label="Fahrenheit (°F)"
                            selected={units.temperature === "fahrenheit"}
                            onClick={() => setUnit("temperature", "fahrenheit")}
                        />

                        <div className="font-semibold text-gray-300 pt-2">Wind Speed</div>
                        <Option
                            label="km/h"
                            selected={units.windSpeed === "kmh"}
                            onClick={() => setUnit("windSpeed", "kmh")}
                        />
                        <Option
                            label="mph"
                            selected={units.windSpeed === "mph"}
                            onClick={() => setUnit("windSpeed", "mph")}
                        />

                        <div className="font-semibold text-gray-300 pt-2">Precipitation</div>
                        <Option
                            label="Millimeters (mm)"
                            selected={units.precipitation === "mm"}
                            onClick={() => setUnit("precipitation", "mm")}
                        />
                        <Option
                            label="Inches (in)"
                            selected={units.precipitation === "inch"}
                            onClick={() => setUnit("precipitation", "inch")}
                        />
                    </div>
                )}
            </div>
        </header>
    );
}

function Option({ label, selected, onClick }: { label: string; selected?: boolean; onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-2 py-1 rounded-md hover:bg-white/10
                        flex justify-between items-center ${selected ? "text-white font-medium" : "text-gray-300"
                }`}
        >
            {label}
            {selected && (
                <IoCheckmark />
            )}
        </button>
    );
}
