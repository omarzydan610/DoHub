import React from "react";

export default function AddSubtaskModal({
  isOpen,
  newSubtaskName,
  onNameChange,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Enter the name of the new subtask:
        </h3>
        <input
          type="text"
          value={newSubtaskName}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full border border-slate-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Subtask name"
        />
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
            Add Subtask
          </button>
        </div>
      </div>
    </div>
  );
}
