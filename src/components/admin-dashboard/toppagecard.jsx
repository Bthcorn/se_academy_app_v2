import React from "react";
import { Eye, User, Star, UserPlus } from "lucide-react"; // Use appropriate icons
import { useTheme } from "../ThemeContext"; // Import ThemeContext

export default function TopPageCard({
  title,
  count,
  percentage,
  icon,
  isIncrease,
}) {
  const { darkMode } = useTheme(); // Access the theme state

  return (
    <div
      className={`p-4 rounded-lg shadow-lg flex flex-col justify-between h-28 w-60 ${
        darkMode ? "bg-[#1E293B]" : "bg-[#FFDCE6]"
      }`}
    >
      {/* Card Header */}
      <div
        className={`flex justify-between items-center text-sm ${
          darkMode ? "text-gray-400" : "text-[#111827]"
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          {icon}
          <span>{title}</span>
        </div>
        <div>
          {/* Dots for extra actions or options */}
          <svg
            width="4"
            height="12"
            viewBox="0 0 4 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="2"
              cy="2"
              r="2"
              fill={darkMode ? "#6B7280" : "#97999e"}
            />
            <circle
              cx="2"
              cy="6"
              r="2"
              fill={darkMode ? "#6B7280" : "#97999e"}
            />
            <circle
              cx="2"
              cy="10"
              r="2"
              fill={darkMode ? "#6B7280" : "#97999e"}
            />
          </svg>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex justify-between items-center mt-4">
        {/* Main Count */}
        <div
          className={`text-2xl font-semibold ${
            darkMode ? "text-white" : "text-[#111827]"
          }`}
        >
          {count}
        </div>
        {/* Percentage Change
        <div
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isIncrease
              ? darkMode
                ? "bg-green-100 text-green-700"
                : "bg-[#ADD057] text-[#111827]"
              : darkMode
              ? "bg-red-100 text-red-700"
              : "bg-[#FFCBAD] text-[#111827]"
          }`}
        >
          {percentage} {isIncrease ? "↑" : "↓"}
        </div> */}
      </div>
    </div>
  );
}
