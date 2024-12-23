import React from "react";

export default function TaskMetadata({ deadline, priority }) {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-slate-100 shadow-sm mb-4">
      <div className="flex items-center space-x-3">
        <span className="font-medium text-slate-700">Deadline</span>
        <span className="text-slate-600 bg-white px-3 py-1 rounded-full text-sm shadow-sm">
          {deadline ? new Date(deadline).toLocaleDateString() : "No deadline"}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="font-medium text-slate-700">Priority</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
            priority === 1
              ? "bg-red-100 text-red-700"
              : priority === 2
              ? "bg-amber-100 text-amber-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {priority === 1 ? "High" : priority === 2 ? "Medium" : "Low"}
        </span>
      </div>
    </div>
  );
}
