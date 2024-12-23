import React from "react";

const AddTaskModal = ({
  showModal,
  taskDetails,
  setTaskDetails,
  handleAddTask,
  setShowModal,
}) => {
  if (!showModal) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h3>
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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
            <div>
              <select
                value={taskDetails.priority}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, priority: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
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
