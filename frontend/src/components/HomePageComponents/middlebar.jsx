import React, { useState } from "react";
import TasksService from "../../Service/TasksService";
import { useAppContext } from "../../contexts/AppContext";
function MiddleBar({ isSidebarOpen, setSidebarOpen }) {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
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
      title: newTaskName,
      dueDate: newTaskDate,
    };
    await TasksService.addTask(task);
    await getUnCompletedTasks();
    setNewTaskName("");
    setNewTaskDate("");
  };

  const handleToggleCompletion = async (task) => {
    if (selectedTask && selectedTask.id === task.id) {
      setSelectedTask(task);
    }
    console.log("togle");
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
      } bg-gray-50 border-l border-gray-300 h-screen`}
    >
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content */}
      <div
        className={`middle-bar p-4 overflow-auto custom-scrollbar relative z-2 transition-all duration-300 ${
          isSidebarOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="task-form-section mb-6">
          <form
            id="taskForm"
            className="flex items-center space-x-2 mb-2"
            onSubmit={handleAddTask}
          >
            <input
              type="text"
              value={newTaskName}
              required
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Task name"
              className="border border-gray-300 p-2 rounded w-2/3 h-10"
            />
            <input
              type="date"
              value={newTaskDate}
              required
              onChange={(e) => setNewTaskDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-1/3 h-10 text-sm xs:text-black"
            />
            <button
              type="submit"
              id="addTask"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 h-10"
            >
              Add
            </button>
          </form>
        </div>

        <h2 className="text-xl font-semibold">TODO</h2>
        <ul
          id="uncompletedTaskList"
          className="task-list mb-6 space-y-2 mt-4 mx-2"
        >
          {uncompletedTasks.length === 0 ? (
            <p className="text-gray-500 italic">No tasks to do</p>
          ) : (
            uncompletedTasks.map((task) => (
              <div
                style={{ userSelect: "none" }}
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className={`flex items-center justify-between p-2 rounded-md border ${
                  selectedTask && selectedTask.id === task.id
                    ? " border-blue-500"
                    : " border-gray-300"
                }`}
              >
                <span>{task.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {new Date(task.due_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(task)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </div>
              </div>
            ))
          )}
        </ul>

        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        <ul id="completedTaskList" className="task-list space-y-2 mt-4 mx-2">
          {completedTasks.length === 0 ? (
            <p className="text-gray-500 italic">No completed tasks</p>
          ) : (
            completedTasks.map((task) => (
              <div
                style={{ userSelect: "none" }}
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className={`flex items-center justify-between p-2 rounded-md border ${
                  selectedTask && selectedTask.id === task.id
                    ? "border-blue-500"
                    : " border-gray-300"
                }`}
              >
                <span>{task.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {new Date(task.due_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(task)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </div>
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default MiddleBar;
