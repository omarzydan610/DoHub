import React from "react";
import { FaBars, FaArrowLeft } from "react-icons/fa";

const SideBarToggleButton = ({ toggleSidebar, backToHome, selectedTask }) => {
  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className={`inline-flex items-center p-2 text-sm text-gray-500 rounded-lg ml:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
          selectedTask ? "hidden" : "block"
        }`}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="w-6 h-6" aria-hidden="true" />
      </button>

      <button
        onClick={backToHome}
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className={`inline-flex items-center p-2 text-sm text-gray-500 rounded-lg ml:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
          selectedTask ? "block" : "hidden"
        }`}
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>
    </>
  );
};

export default SideBarToggleButton;
