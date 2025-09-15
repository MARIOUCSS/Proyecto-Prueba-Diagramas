import React from "react";

export const Input = ({ className = "", type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};
