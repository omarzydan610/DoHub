import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import SideBarToggleButton from "./SideBarComponents/SideBarToggleButton";
import SideBarHeader from "./SideBarComponents/SideBarHeader";
import SideBarButtons from "./SideBarComponents/SideBarButtons";

const SideBar = ({
  isSidebarOpen,
  setSidebarOpen,
  isDarkMode,
  toggleDarkMode,
}) => {
  const { username, selectedTask, setSelectedTask } = useAppContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("x-access-token");
    navigate("/login");
  };

  const backToHome = () => {
    setSelectedTask(null);
  };

  return (
    <div
      className={`side-bar ml:w-1/5 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <SideBarToggleButton
        toggleSidebar={toggleSidebar}
        backToHome={backToHome}
        selectedTask={selectedTask}
        isDarkMode={isDarkMode}
      />
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40  w-64 ml:w-1/5 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ml:translate-x-0`}
        aria-label="Sidebar"
      >
        <div
          className={`h-full border-r ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <ul className="h-full flex flex-col">
            <div className={`text-center py-4 border-b border-opacity-20 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-blue-400 to-indigo-400' 
                  : 'from-blue-600 to-indigo-600'
              } bg-clip-text text-transparent`}>
                DoHub
              </h1>
            </div>
            <SideBarHeader username={username} isDarkMode={isDarkMode} />
            <div className="flex-1 py-4">
              <SideBarButtons
                toggleDropdown={toggleDropdown}
                isDropdownOpen={isDropdownOpen}
                handleLogOut={handleLogOut}
                toggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
              />
            </div>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
