import React from "react";

export const Button = ({
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}) => {
  // Estilos base para todos los botones
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  // Variantes de estilo
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    ghost: "bg-transparent hover:bg-gray-100",
    link: "text-blue-500 underline-offset-4 hover:underline",
  };

  // Tamaños
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };

  const variantStyle = variants[variant] || variants.default;
  const sizeStyle = sizes[size] || sizes.default;

  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
