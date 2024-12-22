import React, { useState } from "react";
import TasksService from "../../../Service/TasksService";
import { useAppContext } from "../../../contexts/AppContext";
import AddTaskModal from "./AddTaskModal";
import TaskList from "./TaskList";

function MiddleBar({ isSidebarOpen, setSidebarOpen }) {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    dueDate: "",
    priority: "",
    tags: "",
  });
  const {
    uncompletedTasks,
    completedTasks,
    getUnCompletedTasks,
    getCompletedTasks,
    setSelectedTask,
    selectedTask,
  } = useAppContext();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const task = {
      title: taskDetails.title,
      dueDate: taskDetails.dueDate,
      priority: taskDetails.priority,
      tags: taskDetails.tags.split(",").map((tag) => tag.trim()),
    };
    await TasksService.addTask(task);
    await getUnCompletedTasks();
    setTaskDetails({ title: "", dueDate: "", priority: "", tags: "" });
    setShowModal(false);
  };

  const handleToggleCompletion = async (task) => {
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(task);
    } else {
      setSelectedTask(null);
    }
    await TasksService.toggleTask(task.id, { completed: !task.completed });
    await getUnCompletedTasks();
    await getCompletedTasks();
  };

  const handleTaskClick = (task) => {
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
    }
  };

  return (
    <div
      className={`relative ${selectedTask ? "hidden ml:block" : "w-screen"} ${
        selectedTask ? "ml:w-2/5" : "ml:w-4/5"
      } bg-gray-50 border-l border-gray-300 min-h-screen max-h-fit`}
    >
      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <AddTaskModal
        showModal={showModal}
        taskDetails={taskDetails}
        setTaskDetails={setTaskDetails}
        handleAddTask={handleAddTask}
        setShowModal={setShowModal}
      />

      <div
        className={`middle-bar p-4 overflow-auto custom-scrollbar relative z-10 transition-all duration-300 ${
          isSidebarOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">TODO</h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-2 bg-transparent text-lg text-blue-500 rounded-full border font-bold border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            +
          </button>
        </div>

        <TaskList
          tasks={uncompletedTasks}
          title="Uncompleted Tasks"
          selectedTask={selectedTask}
          handleTaskClick={handleTaskClick}
          handleToggleCompletion={handleToggleCompletion}
        />
        <TaskList
          tasks={completedTasks}
          title="Completed Tasks"
          selectedTask={selectedTask}
          handleTaskClick={handleTaskClick}
          handleToggleCompletion={handleToggleCompletion}
        />
      </div>
    </div>
  );
}

export default MiddleBar;
