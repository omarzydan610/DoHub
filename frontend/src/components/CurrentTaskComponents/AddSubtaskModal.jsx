import React from "react";

export default function AddSubtaskModal({
  isOpen,
  newSubtaskName,
  onNameChange,
  onConfirm,
  onCancel,
  isDarkMode,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
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
          Enter the name of the new subtask:
        </h3>
        <input
          type="text"
          value={newSubtaskName}
          onChange={(e) => onNameChange(e.target.value)}
          className={`w-full rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
              : "bg-white border-slate-300 text-gray-900 placeholder-gray-500"
          }`}
          placeholder="Subtask name"
        />
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
            Add Subtask
          </button>
        </div>
      </div>
    </div>
  );
}
