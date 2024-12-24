import React from "react";
import { FaBars, FaArrowLeft } from "react-icons/fa";

const SideBarToggleButton = ({
  toggleSidebar,
  backToHome,
  selectedTask,
  isDarkMode,
}) => {
  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className={`inline-flex items-center p-2 text-sm rounded-lg ml:hidden focus:outline-none focus:ring-2 ${
          isDarkMode
            ? "text-gray-400  focus:ring-gray-600 hover:bg-gray-900"
            : "text-gray-500 focus:ring-gray-200 hover:bg-gray-300"
        } ${selectedTask ? "hidden" : "block"}`}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="w-6 h-6" aria-hidden="true" />
      </button>

      <button
        onClick={backToHome}
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className={`inline-flex items-center p-2 text-sm rounded-lg ml:hidden  focus:outline-none focus:ring-2 ${
          isDarkMode
            ? "text-gray-400 hover:bg-gray-900 focus:ring-gray-600"
            : "text-gray-500 focus:ring-gray-200 hover:bg-gray-300"
        } ${selectedTask ? "block" : "hidden"}`}
      >
        <FaArrowLeft className="w-6 h-6" />
      </button>
    </>
  );
};

export default SideBarToggleButton;
