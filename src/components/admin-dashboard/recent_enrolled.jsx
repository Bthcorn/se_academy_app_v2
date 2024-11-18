import React from 'react';

export default function RecentEnrolled({ data }) {
  return (
    <div className="p-6 bg-[#1E293B] rounded-lg shadow-lg w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-white">Recent Enrolled</h2>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-6 text-gray-400 text-[10px] font-medium mb-2">
        <span>User</span>
        <span>Course Name</span>
        <span>Course ID</span>
        <span>Date</span>
      </div>

      {/* List of enrolled users */}
      <ul className="space-y-2">
        {data.map((entry, index) => (
          <li key={index} className="grid grid-cols-6 items-center bg-[#0F172A] p-2 rounded-md text-[10px]">
            <p className="text-white">{entry.username}</p>  {/* User Name */}
            <p className="text-white">{entry.course_name}</p>  {/* Course Name */}
            <p className="text-gray-400">{entry.course_id}</p>  {/* Course ID */}
            <p className="text-gray-400">{entry.enrolled_at}</p>  {/* Date */}
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
