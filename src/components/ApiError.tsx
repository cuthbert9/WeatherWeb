"use client";

import { RotateCcw } from "lucide-react";
import { MdNotInterested } from "react-icons/md";

type ApiErrorProps = {
  onRetry: () => void;
  message?: string;
};

export default function ApiError({ onRetry, message }: ApiErrorProps) {
  return (
    <div
      className="
        w-full min-h-[60vh] flex flex-col items-center justify-center
        gap-5 px-4 sm:px-6 py-10 text-white
      "
    >
      <MdNotInterested className="w-14 h-14 sm:w-16 sm:h-16 text-gray-400" />

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
        Something went wrong
      </h2>

      <p className="text-gray-400 text-center text-xs sm:text-sm md:text-base max-w-sm">
        {message ??
          "We couldn’t connect to the server (API error). Please try again in a few moments."}
      </p>

      <button
        onClick={onRetry}
        className="
          flex items-center gap-2
          bg-gray-700 hover:bg-gray-600
          px-5 py-2.5
          rounded-md
          text-xs sm:text-sm md:text-base
          font-medium
          transition-colors
        "
      >
        <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
        Retry
      </button>
    </div>
  );
}
