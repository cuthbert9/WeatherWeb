"use client";

import { Sun, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="flex justify-between items-center w-full relative">
            <div className="flex items-center gap-2">
                <Sun className="w-8 h-8 text-orange-400 fill-orange-400" />
                <span className="text-xl font-bold tracking-tight">Weather Now</span>
            </div>

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
                    <h1>Switch to Imperial</h1>
                    <div className="font-semibold text-gray-300">Temperature</div>
                    <Option label="Celsius (°C)" selected />
                    <Option label="Fahrenheit (°F)" />

                    <div className="font-semibold text-gray-300 pt-2">Wind Speed</div>
                    <Option label="km/h" selected />
                    <Option label="mph" />

                    <div className="font-semibold text-gray-300 pt-2">Precipitation</div>
                    <Option label="Millimeters (mm)" selected />
                    <Option label="Inches (in)" />
                </div>
            )}
        </header>
    );
}

function Option({ label, selected }: { label: string; selected?: boolean }) {
    return (
        <button
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
