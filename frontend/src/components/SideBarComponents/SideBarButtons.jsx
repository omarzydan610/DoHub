import { FaList, FaCalendar, FaSignOutAlt } from "react-icons/fa";
import { useAppContext } from "../../contexts/AppContext";

const SideBarButtons = ({
  toggleDropdown,
  isDropdownOpen,
  handleLogOut,
  toggleDarkMode,
  isDarkMode,
}) => {
  const { userTags, activeCategory, setActiveCategory } = useAppContext();
  const notSelected = isDarkMode
    ? "text-gray-200 bg-gray-800 hover:bg-gray-700"
    : "text-gray-700 bg-white hover:bg-blue-50";

  const sidebarButtonClass =
    "flex items-center w-full p-2 rounded-lg transition-all duration-200 ";

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <div>
      <li className={"px-3 py-2"}>
        <button
          className={` ${sidebarButtonClass} ${
            activeCategory === "My List"
              ? isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-blue-50"
              : `${notSelected}`
          }`}
          aria-label="My List"
          onClick={() => handleChangeCategory("My List")}
        >
          <FaList className="w-5 h-5 text-blue-500" />
          <span className="ms-3 font-medium">My List</span>
        </button>
      </li>

      <li className="px-3 py-2">
        <button
          type="button"
          className={`${sidebarButtonClass} ${notSelected} justify-between`}
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
            isDropdownOpen ? "max-h-44" : "max-h-0"
          } overflow-scroll transition-all duration-300 space-y-1 mt-2`}
        >
          {userTags.length > 0 ? (
            userTags.map((tag) => (
              <li key={tag.id}>
                <button
                  className={`pl-6 ${sidebarButtonClass} ${
                    activeCategory === tag.name
                      ? isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-blue-50"
                      : `${notSelected}`
                  }`}
                  onClick={() => handleChangeCategory(`${tag.name}`)}
                >
                  {tag.name}
                </button>
              </li>
            ))
          ) : (
            <div>
              <p className="text-sm italic text-gray-500">No tags found</p>
            </div>
          )}
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
        <button
          className={`${sidebarButtonClass} ${
            activeCategory === "Calendar"
              ? isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-blue-50"
              : `${notSelected}`
          }`}
          aria-label="Calendar"
          onClick={() => handleChangeCategory("Calendar")}
        >
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
    </div>
  );
};

export default SideBarButtons;
