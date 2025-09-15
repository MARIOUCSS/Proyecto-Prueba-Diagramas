import React from "react";

export function Badge({ variant = "default", className = "", children }) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

  const variants = {
    default: "bg-blue-600 text-white border-transparent",
    secondary: "bg-gray-200 text-gray-800 border-transparent",
    destructive: "bg-red-600 text-white border-transparent",
    outline: "border border-gray-400 text-gray-800",
  };

  return (
    <div className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
