import { React, useState } from "react";
import SideBar from "../components/HomePageComponents/SideBar";
import MiddleBar from "../components/HomePageComponents/middlebar";
import "../styles/listScreen.css";
import TaskEdit from "../components/HomePageComponents/TaskEdit";
const HomePage = () => {
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
};
export default HomePage;
