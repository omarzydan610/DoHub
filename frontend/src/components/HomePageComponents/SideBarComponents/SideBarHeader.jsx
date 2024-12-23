import React from "react";

const SideBarHeader = ({ username }) => {
  const displayName = username || "";

  return (
    <li>
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          {displayName[0]?.toUpperCase() || "?"}
        </div>
        <span className="ml-3 font-medium text-gray-800 dark:text-white">
          {displayName || "Guest"}
        </span>
      </div>
    </li>
  );
};

export default SideBarHeader;
