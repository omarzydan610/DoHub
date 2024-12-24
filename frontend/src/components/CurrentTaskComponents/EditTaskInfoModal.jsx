import React from "react";

export default function EditTaskInfoModal({
  isOpen,
  task,
  onTaskChange,
  onConfirm,
  onCancel,
  isDarkMode,
}) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isDarkMode ? "bg-white/10" : "bg-black/40"
      } backdrop-blur-sm z-50`}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        } p-6 rounded-xl shadow-xl max-w-md w-full mx-4`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            isDarkMode ? "text-gray-100" : "text-slate-800"
          }`}
        >
          Edit Task Details
        </h3>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-slate-700"
            }`}
          >
            Task Name
          </label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
            className={`w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-slate-300 text-gray-900"
            }`}
            placeholder="Task name"
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-slate-700"
            }`}
          >
            Deadline
          </label>
          <input
            type="datetime-local"
            value={
              task.due_date
                ? new Date(task.due_date)
                    .toLocaleString("sv")
                    .replace(" ", "T")
                    .slice(0, 16)
                : ""
            }
            onChange={(e) =>
              onTaskChange({ ...task, due_date: e.target.value })
            }
            className={`w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-slate-300 text-gray-900"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-1 ${
              isDarkMode ? "text-gray-300" : "text-slate-700"
            }`}
          >
            Priority
          </label>
          <select
            value={task.priority}
            onChange={(e) =>
              onTaskChange({ ...task, priority: parseInt(e.target.value) })
            }
            className={`w-full rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-slate-300 text-gray-900"
            }`}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
