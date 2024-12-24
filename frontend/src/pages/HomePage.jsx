import { React, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import MiddleBar from "../components/MiddleBar";
import CurrentTask from "../components/CurrentTask";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useAppContext();

  const token = localStorage.getItem("x-access-token");

  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  const toggleDarkMode = () => {
    localStorage.setItem("DarkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (localStorage.getItem("x-access-token") === null) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <div
      className={`list-screen h-full w-full overflow-y-hidden flex ${
        isDarkMode ? "bg-gray-700" : "bg-gray-50"
      }`}
    >
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <MiddleBar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
      />
      <CurrentTask isDarkMode={isDarkMode} />
    </div>
  );
};
export default HomePage;
