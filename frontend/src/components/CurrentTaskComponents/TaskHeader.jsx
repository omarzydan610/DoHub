import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TaskHeader({ title, onEdit, onDelete, isDarkMode }) {
  return (
    <div className={`flex justify-between items-center p-4 w-full mb-6 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-blue-900 to-blue-700' 
        : 'bg-gradient-to-r from-blue-600 to-blue-400'
    }`}>
      <h2 className="text-2xl font-semibold text-white tracking-wide">
        {title || "Task"}
      </h2>
      <div className="flex space-x-4">
        <button
          className="text-white hover:text-blue-200 transition-colors duration-200"
          onClick={onEdit}
        >
          <FaEdit size={20} />
        </button>
        <button
          className="text-white hover:text-red-200 transition-colors duration-200"
          onClick={onDelete}
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
}
