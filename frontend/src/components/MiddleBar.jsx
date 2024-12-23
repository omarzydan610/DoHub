import React, { useState } from "react";
import TasksService from "../Service/TasksService";
import { useAppContext } from "../contexts/AppContext";
import AddTaskModal from "./HomePageComponents/MiddleBarComponents/AddTaskModal";
import TaskList from "./HomePageComponents/MiddleBarComponents/TaskList";

function MiddleBar({ isSidebarOpen, setSidebarOpen }) {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    dueDate: "",
    priority: "",
  });
  const {
    uncompletedTasks,
    completedTasks,
    getUnCompletedTasks,
    getCompletedTasks,
    setSelectedTask,
    selectedTask,
    getSubTasks,
  } = useAppContext();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const task = {
      title: taskDetails.title,
      dueDate: taskDetails.dueDate,
      priority: taskDetails.priority,
    };
    await TasksService.addTask(task);
    await getUnCompletedTasks();
    setTaskDetails({ title: "", dueDate: "", priority: "" });
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

  const handleTaskClick = async (task) => {
    console.log(task);

    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
      await getSubTasks(task.id);
    }
  };

  return (
    <div
      className={`relative ${selectedTask ? "hidden ml:block" : "w-screen"} ${
        selectedTask ? "ml:w-2/5" : "ml:w-4/5"
      } bg-slate-50 min-h-screen max-h-fit shadow-lg`}
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
        className={`middle-bar p-6 overflow-auto custom-scrollbar relative z-10 transition-all duration-300 ${
          isSidebarOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
          <button
            onClick={() => setShowModal(true)}
            className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-200"
          >
            <span className="text-xl">+</span>
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
