import React from "react";

export default function SubtaskList({ subtasks, onToggleCompletion }) {
  return (
    <div className="px-6 space-y-2">
      {subtasks.map((task) =>
        task ? (
          <div
            key={task.id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className="text-slate-700">{task.title}</span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleCompletion(task.id)}
              className="h-5 w-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        ) : null
      )}
    </div>
  );
}
