import React from "react";

const AddTaskModal = ({
  showModal,
  taskDetails,
  setTaskDetails,
  handleAddTask,
  setShowModal,
  isDarkMode,
}) => {
  if (!showModal) return null;

  return (
    <>
      <div
        className={`fixed inset-0 backdrop-blur-sm z-50 ${
          isDarkMode ? "bg-white/10" : "bg-black/40"
        }`}
        onClick={() => setShowModal(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className={`${
            isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
          } p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Add New Task
          </h3>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Task Name"
                value={taskDetails.title}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, title: e.target.value })
                }
                required
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <div>
              <input
                type="datetime-local"
                value={taskDetails.dueDate}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, dueDate: e.target.value })
                }
                required
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              />
            </div>
            <div>
              <select
                value={taskDetails.priority}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, priority: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                required
              >
                <option value="">Select Priority</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className={`flex-1 text-white py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;
