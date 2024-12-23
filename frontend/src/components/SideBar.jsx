import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import SideBarToggleButton from "./HomePageComponents/SideBarComponents/SideBarToggleButton";
import SideBarHeader from "./HomePageComponents/SideBarComponents/SideBarHeader";
import SideBarButtons from "./HomePageComponents/SideBarComponents/SideBarButtons";

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
    <div className="side-bar ml:w-64">
      <SideBarToggleButton
        toggleSidebar={toggleSidebar}
        backToHome={backToHome}
        selectedTask={selectedTask}
      />
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ml:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="h-full flex flex-col">
            <SideBarHeader username={username} />
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
