import React from "react";

const SideBarHeader = ({ username }) => {
  return (
    <li>
      <button className="flex items-center py-3 text-white text-lg font-bold text-center bg-blue-500 dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group w-full">
        <span className="w-full text-center text-xl">{username}</span>
      </button>
    </li>
  );
};

export default SideBarHeader;
