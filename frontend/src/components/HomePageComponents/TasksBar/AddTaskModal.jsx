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
        className="fixed inset-0 bg-gray-700 bg-opacity-50 z-30"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
          <h3 className="text-lg font-semibold">Add New Task</h3>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task Name"
              value={taskDetails.title}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, title: e.target.value })
              }
              required
              className="border p-2 mb-2 w-full"
            />
            <input
              type="date"
              value={taskDetails.dueDate}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, dueDate: e.target.value })
              }
              required
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Priority"
              value={taskDetails.priority}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, priority: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={taskDetails.tags}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, tags: e.target.value })
              }
              className="border p-2 mb-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;
