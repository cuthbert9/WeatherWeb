"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

type ApiErrorProps = {
  onRetry: () => void;
  message?: string;
};

export default function ApiError({ onRetry, message }: ApiErrorProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 mt-20 text-white p-6 rounded-xl">
      <AlertCircle className="w-12 h-12 text-gray-400" />

      <h2 className="text-3xl font-semibold">Something went wrong</h2>

      <p className="text-gray-400 text-sm text-center max-w-xs">
        {message ?? "We couldn’t connect to the server (API error). Please try again in a few moments."}
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600
                   px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}
