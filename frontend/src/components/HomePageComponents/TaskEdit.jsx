import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppContext } from "../../contexts/AppContext";
import TasksService from "../../Service/TasksService";

export default function TaskEdit() {
  const [subtasks, setSubtasks] = useState([
    { id: 1, name: "SubTask 1", completed: false },
    { id: 2, name: "SubTask 2", completed: true },
    { id: 3, name: "SubTask 3", completed: true },
  ]);

  // Calculate completion percentage based on subtasks
  const completedTasks = subtasks.filter((task) => task.completed).length;
  const totalTasks = subtasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;
  const {
    selectedTask,
    setSelectedTask,
    getUnCompletedTasks,
    getCompletedTasks,
  } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle completion of a subtask
  const toggleCompletion = (id) => {
    setSubtasks(
      subtasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    console.log("Delete Task");
    await TasksService.deleteTask(selectedTask.id);
    setSelectedTask(null);
    getUnCompletedTasks();
    getCompletedTasks();
    setIsModalOpen(false); // Close the modal after deletion
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  return (
    <div
      className={`bg-white rounded-none ${selectedTask ? "block" : "hidden"}
      ml:w-2/5 ${
        selectedTask ? "w-screen" : "hidden"
      } bg-gray-50 border-l border-gray-300 h-screen`}
    >
      <div className="flex justify-between items-center  p-3 bg-blue-500 w-full mb-4">
        <h2 className="text-xl font-bold text-white">
          {selectedTask ? selectedTask.title : "Task"}
        </h2>
        <div className="flex space-x-3">
          <button className="text-white hover:text-blue-200">
            <FaEdit />
          </button>
          <button
            className="text-white hover:text-red-200"
            onClick={handleDeleteTask}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mx-2 mb-4">This is Description for Task3</p>

      {/* Progress Bar */}
      <div className="w-90 mx-2 bg-gray-200 rounded-full h-4 mb-2">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <p className="text-right mx-2 text-sm text-gray-600 mb-4">
        {completionPercentage.toFixed(0)}% Complete
      </p>

      {/* Subtasks */}
      <div className="mt-4 mx-2 space-y-2">
        {subtasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-blue-100 p-2 rounded-md"
          >
            <span>{task.name}</span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
        ))}
      </div>

      {/* Add Subtask Button */}
      <button className="mt-6 text-blue-600 hover:underline pl-3">
        + Add SubTask
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg  h-1/6 flex flex-col justify-center items-center">
            <h3 className="text-lg  mb-4">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-around w-full">
              <button
                onClick={cancelDelete}
                className="text-white bg-gray-400 hover:bg-gray-500 rounded px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
