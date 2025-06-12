// Spinner.tsx
import React from "react";

export default function Spinner({ size = 5 }: { size?: number }) {
  return (
    <svg
      className={`animate-spin w-${size} h-${size} text-indigo`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  );
}
