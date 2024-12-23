import React from 'react';

export default function DeleteModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Are you sure you want to delete this task?
        </h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
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