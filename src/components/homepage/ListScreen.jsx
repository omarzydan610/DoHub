import { React, useState } from "react";
import SideBar from "./SideBar";
import MiddleBar from "./middlebar";
import "../../styles/listScreen.css";
import TaskEdit from "./TaskEdit";
function ListScreen() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // document.documentElement.classList.toggle("dark");
  };
  return (
    <div className="list-screen w-full">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <MiddleBar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <TaskEdit />
    </div>
  );
}
export default ListScreen;
