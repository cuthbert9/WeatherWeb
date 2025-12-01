"use client";

import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

type SearchFormData = {
    query: string;
};

export function SearchForm() {
    const {
        getValues,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SearchFormData>();



    const onSubmit =  (data: SearchFormData) => {
        console.log("Searching for:", data.query);     
       
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
                    className={`w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all 
                        focus:ring-blue-500/50
                        ${errors.query ? "border-red-500 focus:ring-red-500/50" : ""}
                    `}
                    disabled={isSubmitting}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors 
                    disabled:opacity-50 disabled:cursor-not-allowed 
                    ${isSubmitting ? "animate-pulse" : ""}
                `}
            >
                {isSubmitting ? "Searching..." : "Search"}
            </button>
        </form>
    );
}
