import React from "react";

export default function EditTaskInfoModal({
  isOpen,
  task,
  onTaskChange,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Edit Task Details
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Task Name
          </label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Task name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
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
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Priority
          </label>
          <select
            value={task.priority}
            onChange={(e) =>
              onTaskChange({ ...task, priority: parseInt(e.target.value) })
            }
            className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
