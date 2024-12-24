import { FaList, FaCalendar, FaSignOutAlt } from "react-icons/fa";

const SideBarButtons = ({
  toggleDropdown,
  isDropdownOpen,
  handleLogOut,
  toggleDarkMode,
  isDarkMode,
}) => {
  const sidebarButtonClass =
    "flex items-center w-full p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 " +
    (isDarkMode
      ? "text-gray-200 bg-gray-800 hover:bg-gray-700"
      : "text-gray-700 bg-white hover:bg-blue-50");

  return (
    <>
      <li className="px-3 py-2">
        <button className={sidebarButtonClass} aria-label="My List">
          <FaList className="w-5 h-5 text-blue-500" />
          <span className="ms-3 font-medium">My List</span>
        </button>
      </li>

      <li className="px-3 py-2">
        <button
          type="button"
          className={`${sidebarButtonClass} justify-between`}
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-controls="tags-dropdown"
        >
          <span className="font-medium">Tags</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <ul
          id="tags-dropdown"
          className={`${
            isDropdownOpen ? "max-h-48" : "max-h-0"
          } overflow-hidden transition-all duration-300 space-y-1 mt-2`}
        >
          {["Tag1", "Tag2", "Tag3"].map((tag) => (
            <li key={tag}>
              <button
                className={`flex w-full p-2 rounded-lg pl-9 hover:bg-blue-50 transition-all duration-200 ${
                  isDarkMode ? "text-gray-300" : "dark:text-gray-600"
                } `}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </li>

      <li className="px-3 py-2">
        <div
          className={`flex items-center justify-between p-2 rounded-lg ${
            isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
          }`}
        >
          <span className="font-medium">Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="w-11 h-6 rounded-full peer bg-gray-200 dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>
      </li>

      <li className="px-3 py-2">
        <button className={sidebarButtonClass} aria-label="Calendar">
          <FaCalendar className="w-5 h-5 text-blue-500" />
          <span className="ms-3 font-medium">Calendar</span>
        </button>
      </li>

      <li className="px-3 py-2 mt-auto">
        <button
          onClick={handleLogOut}
          className="flex items-center w-full p-2 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
          aria-label="Sign Out"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="ms-3 font-medium">Sign Out</span>
        </button>
      </li>
    </>
  );
};

export default SideBarButtons;
