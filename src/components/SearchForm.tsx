"use client";

import { useWeather } from "@/Context";
import { useForm } from "react-hook-form";
import { Search, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";

type SearchFormData = {
    query: string;
};

type Suggestion = {
    id: number;
    name: string;
    country: string;
    admin1?: string;
};

export function SearchForm() {
    const { fetchWeather, isLoading } = useWeather();
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SearchFormData>();

    const queryValue = watch("query");

    // Debounced value - waits 500ms after typing stops
    const [debouncedQuery] = useDebounce(queryValue, 500);

    // Fetch suggestions using debounced query
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedQuery || debouncedQuery.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedQuery}&count=5&language=en&format=json`
                );
                const data = await res.json();

                if (data.results) {
                    setSuggestions(data.results);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onSubmit = async (data: SearchFormData) => {
        if (!data.query.trim()) return;
        await fetchWeather(data.query.trim());
        setShowSuggestions(false);

    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setValue("query", suggestion.name);
        setShowSuggestions(false);
        fetchWeather(suggestion.name);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col md:flex-row gap-2 relative"
        >
            <div className="relative flex-1" ref={dropdownRef}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                    {...register("query", { required: true })}
                    type="text"
                    autoComplete="off"
                    placeholder="Search for a place..."
                    className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all 
                        focus:ring-blue-500/50
                        ${errors.query ? "border-red-500 focus:ring-red-500/50" : ""}
                    `}
                    disabled={isLoading}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                />

                {/* Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1C1F32] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
                        {suggestions.map((suggestion) => (
                            <button
                                key={suggestion.id}
                                type="button"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full text-left px-4 py-3 hover:bg-white/5 flex items-center gap-3 transition-colors border-b border-white/5 last:border-0"
                            >
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <div>
                                    <span className="text-white font-medium">{suggestion.name}</span>
                                    <span className="text-gray-400 text-sm ml-2">
                                        {suggestion.admin1 ? `${suggestion.admin1}, ` : ""}
                                        {suggestion.country}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors w-full md:w-auto
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    ${isLoading ? "animate-pulse" : ""}
                `}
            >
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}
