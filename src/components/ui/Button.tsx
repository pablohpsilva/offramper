import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-medium rounded-lg focus:ring-4 focus:outline-none inline-flex items-center justify-center";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 text-white",
    outline:
      "border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 text-gray-900",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-300 text-white",
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const loadingClass = isLoading ? "opacity-70 cursor-not-allowed" : "";
  const disabledClass = disabled ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${loadingClass} ${disabledClass} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
