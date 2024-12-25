import React from "react";

export default function DeleteModal({
  isOpen,
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
          Are you sure you want to delete this Tag?
        </h3>
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
            className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
