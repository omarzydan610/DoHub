import React from "react";

const SideBarHeader = ({ username, isDarkMode }) => {
  const displayName = username || "";

  return (
    <li>
      <div
        className={`flex items-center p-4 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          {displayName[0]?.toUpperCase() || "?"}
        </div>
        <span
          className={`ml-3 font-medium ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {displayName || "Guest"}
        </span>
      </div>
    </li>
  );
};

export default SideBarHeader;
