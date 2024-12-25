import React from "react";

export default function TaskMetadata({ deadline, priority, isDarkMode }) {
  return (
    <div
      className={`flex justify-between items-center px-2 xs:px-6 py-3 shadow-sm mb-4 ${
        isDarkMode ? "bg-gray-800" : "bg-slate-100"
      }`}
    >
      <div className="flex items-center space-x-1 xs:space-x-3">
        <span
          className={`font-medium text-sm xs:text-base ${
            isDarkMode ? "text-gray-200" : "text-slate-700"
          }`}
        >
          Deadline
        </span>
        <span
          className={` px-1 xs:px-3 py-1 rounded-full text-xs xs:text-sm shadow-sm ${
            isDarkMode ? "bg-gray-700 text-gray-300" : "bg-white text-slate-600"
          }`}
        >
          {deadline
            ? new Date(deadline).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })
            : "No deadline"}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <span
          className={`font-medium text-sm xs:text-base ${
            isDarkMode ? "text-gray-200" : "text-slate-700"
          }`}
        >
          Priority
        </span>
        <span
          className={` px-2 xs:px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
            priority === 3
              ? isDarkMode
                ? "bg-red-900/50 text-red-200"
                : "bg-red-100 text-red-700"
              : priority === 2
              ? isDarkMode
                ? "bg-amber-900/50 text-amber-200"
                : "bg-amber-100 text-amber-700"
              : isDarkMode
              ? "bg-emerald-900/50 text-emerald-200"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {priority === 3 ? "High" : priority === 2 ? "Medium" : "Low"}
        </span>
      </div>
    </div>
  );
}
