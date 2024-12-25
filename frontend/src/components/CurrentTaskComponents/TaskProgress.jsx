import React from "react";

export default function TaskProgress({ completionPercentage, isDarkMode }) {
  return (
    <div className="px-6 mb-6">
      <div
        className={`w-full rounded-full h-2 mb-2 overflow-hidden ${
          isDarkMode ? "bg-gray-700" : "bg-slate-200"
        }`}
      >
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <p
        className={`text-right text-sm ${
          isDarkMode ? "text-gray-400" : "text-slate-600"
        }`}
      >
        {completionPercentage.toFixed(0)}% Complete
      </p>
    </div>
  );
}
