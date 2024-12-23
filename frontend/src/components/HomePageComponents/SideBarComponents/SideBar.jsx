import React, { useState } from "react";
import { useAppContext } from "../../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import SideBarToggleButton from "./SideBarToggleButton";
import SideBarHeader from "./SideBarHeader";
import SideBarButtons from "./SideBarButttons";

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
    <div className="side-bar ml:w-1/5">
      <SideBarToggleButton
        toggleSidebar={toggleSidebar}
        backToHome={backToHome}
        selectedTask={selectedTask}
      />
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-30 w-2/5 ml:w-1/5 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ml:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SideBarHeader username={username} />
            <SideBarButtons
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              handleLogOut={handleLogOut}
              toggleDarkMode={toggleDarkMode}
              isDarkMode={isDarkMode}
            />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
