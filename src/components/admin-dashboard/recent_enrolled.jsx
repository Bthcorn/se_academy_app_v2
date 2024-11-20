import React from "react";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

export default function RecentEnrolled({ data }) {
  const { darkMode } = useTheme(); // Access the current theme state

  return (
    <div
      className={`w-full max-w-2xl rounded-lg p-6 shadow-lg ${
        darkMode ? "bg-[#1E293B]" : "bg-[#FFDCE6]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          className={`text-sm font-semibold ${
            darkMode ? "text-white" : "text-[#111827]"
          }`}
        >
          Recent Enrolled
        </h2>
      </div>

      {/* Table header */}
      <div
        className={`mb-2 grid grid-cols-6 text-[10px] font-medium ${
          darkMode ? "text-gray-400" : "text-[#111827]"
        }`}
      >
        <span>User</span>
        <span>Course Name</span>
        <span>Course ID</span>
        <span>Date</span>
      </div>

      {/* List of enrolled users */}
      <ul className="space-y-2">
        {data.map((entry, index) => (
          <li
            key={index}
            className={`grid grid-cols-6 items-center rounded-md p-2 text-[10px] ${
              darkMode
                ? "bg-[#0F172A] text-white"
                : "border border-[#FFDCE6] bg-[#FFF] text-[#111827]"
            }`}
          >
            <p>{entry.username}</p> {/* User Name */}
            <p>{entry.course_title}</p> {/* Course Name */}
            <p className="text-gray-400">{entry.course_id}</p> {/* Course ID */}
            <p className="text-gray-400">
              {new Date(entry.enrolled_at).toLocaleString()}
            </p>{" "}
            {/* Date */}
            {/* The following comments and logic are preserved */}
            {/* <p>
              <span className={`px-2 py-1 rounded-full text-[9px] font-semibold ${
                entry.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                entry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {entry.status}
              </span>
            </p>
            <p className="text-white">{entry.course_length} hours</p>  Total Hours */}
          </li>
        ))}
      </ul>
    </div>
  );
}
