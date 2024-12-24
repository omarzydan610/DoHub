import React from "react";

export default function SubtaskList({
  subtasks,
  onToggleCompletion,
  onDeleteSubtask,
  isDarkMode,
}) {
  return (
    <div className="px-6 space-y-2">
      {subtasks.map((task) =>
        task ? (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
              isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-slate-700"
            }`}
          >
            <span className={isDarkMode ? "text-gray-100" : "text-slate-700"}>
              {task.title}
            </span>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleCompletion(task.id)}
                className={`h-5 w-5 rounded-md text-blue-600 focus:ring-blue-500 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "border-slate-300 bg-white"
                }`}
              />
              <button
                onClick={() => onDeleteSubtask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
