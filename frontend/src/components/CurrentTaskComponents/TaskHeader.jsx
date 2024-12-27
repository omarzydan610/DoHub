import React from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

export default function TaskHeader({
  title,
  onEdit,
  onDelete,
  isDarkMode,
  handleAddCollaborator,
  newCollabEmail,
  setNewCollabEmail,
  showCollabDropdown,
  setShowCollabDropdown,
  conterbuterError,
  setConterbuterError,
}) {
  return (
    <div
      className={`flex justify-between items-center p-4 w-full mb-6 ${
        isDarkMode
          ? "bg-gradient-to-r from-blue-900 to-blue-700"
          : "bg-gradient-to-r from-blue-600 to-blue-400"
      }`}
    >
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
        <div className="relative mt-1">
          <button
            onClick={() => {
              setShowCollabDropdown(!showCollabDropdown);
              setConterbuterError(null); // Clear error when opening dropdown
            }}
            className="text-white hover:text-blue-200 transition-colors duration-200 ml-2"
          >
            <FaUserPlus size={20} />
          </button>

          {showCollabDropdown && (
            <div
              className={`absolute right-0 mt-2 w-64 p-3 rounded-lg shadow-lg z-50
            ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
            >
              <input
                type="email"
                value={newCollabEmail}
                onChange={(e) => {
                  setNewCollabEmail(e.target.value);
                  setConterbuterError(null); // Clear error when typing
                }}
                placeholder="Enter collaborator email"
                className={`w-full px-3 py-2 mb-2 rounded-lg outline-none
    ${
      isDarkMode
        ? "bg-gray-700 text-white placeholder-gray-400"
        : "bg-gray-50 text-gray-900 placeholder-gray-500"
    }`}
              />
              {conterbuterError && (
                <div className="mb-2 p-2 text-lg text-red-600  rounded-lg transition-all">
                  {conterbuterError}
                </div>
              )}
              <button
                onClick={handleAddCollaborator}
                className="w-full px-3 py-2 text-sm font-medium text-white bg-blue-500 
                rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Collaborator
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
