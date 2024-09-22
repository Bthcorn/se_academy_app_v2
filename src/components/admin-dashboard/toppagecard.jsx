import React from 'react';
import { Eye, User, Star, UserPlus } from 'lucide-react'; // Use appropriate icons

export default function TopPageCard({ title, count, percentage, icon, isIncrease }) {
  return (
    <div className="bg-[#1E293B] p-4 rounded-lg shadow-lg flex flex-col justify-between h-28 w-60">
      {/* Card Header */}
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          {/* Icon */}
          {icon}
          <span>{title}</span>
        </div>
        <div className="text-gray-500">
          {/* Dots for extra actions or options */}
          <svg width="4" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2" cy="2" r="2" fill="#6B7280"/>
            <circle cx="2" cy="6" r="2" fill="#6B7280"/>
            <circle cx="2" cy="10" r="2" fill="#6B7280"/>
          </svg>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex justify-between items-center mt-4">
        {/* Main Count */}
        <div className="text-white text-2xl font-semibold">{count}</div>
        {/* Percentage Change */}
        <div className={`text-xs font-semibold px-2 py-1 rounded-full ${isIncrease ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {percentage} {isIncrease ? '↑' : '↓'}
        </div>
      </div>
    </div>
  );
}
