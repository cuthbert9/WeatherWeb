"use client";

import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type SearchFormData = {
    query: string;
};

export function SearchForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SearchFormData>();

    const onSubmit = async (data: SearchFormData) => {
        console.log("Searching for:", data.query);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex gap-2"
        >
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    {...register("query", { required: true })}
                    type="text"
                    placeholder="Search for a place..."
                    className={twMerge(
                        "w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all",
                        errors.query && "border-red-500 focus:ring-red-500/50"
                    )}
                    disabled={isSubmitting}
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={twMerge(
                    "bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    isSubmitting && "animate-pulse"
                )}
            >
                {isSubmitting ? "Searching..." : "Search"}
            </button>
        </form>
    );
}
