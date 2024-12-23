import React from "react";

export default function TaskProgress({ completionPercentage }) {
  return (
    <div className="px-6 mb-6">
      <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-slate-600">
        {completionPercentage.toFixed(0)}% Complete
      </p>
    </div>
  );
}
