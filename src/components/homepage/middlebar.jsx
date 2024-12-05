import React, { useState } from "react";

function MiddleBar({ isSidebarOpen, setSidebarOpen }) {
  const [uncompletedTasks, setUncompletedTasks] = useState([
    { id: 3, name: "task 3", completed: false, date: "2024-11-30" },
    { id: 5, name: "task 5", completed: false, date: "2024-12-01" },
    { id: 6, name: "task 6", completed: false, date: "2024-12-02" },
    { id: 7, name: "task 7", completed: false, date: "2024-12-03" },
    { id: 8, name: "task 8", completed: false, date: "2024-12-04" },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    { id: 1, name: "task 1", completed: true, date: "2024-11-25" },
    { id: 2, name: "task 2", completed: true, date: "2024-11-26" },
    { id: 4, name: "task 4", completed: true, date: "2024-11-27" },
    { id: 9, name: "task 9", completed: true, date: "2024-11-28" },
    { id: 10, name: "task 10", completed: true, date: "2024-11-29" },
  ]);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");

  const toggleCompletion = (id) => {
    const task =
      uncompletedTasks.find((task) => task.id === id) ||
      completedTasks.find((task) => task.id === id);

    task.completed = !task.completed;

    if (task.completed) {
      setUncompletedTasks(uncompletedTasks.filter((task) => task.id !== id));
      setCompletedTasks([...completedTasks, task]);
    } else {
      setCompletedTasks(completedTasks.filter((task) => task.id !== id));
      setUncompletedTasks([...uncompletedTasks, task]);
    }
  };

  return (
    <div className="relative w-screen sm:w-2/5">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content */}
      <div
        className={`middle-bar p-4 overflow-auto custom-scrollbar relative z-2 bg-white transition-all duration-300 ${
          isSidebarOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="task-form-section mb-6">
          <form
            id="taskForm"
            className="flex items-center space-x-2 mb-2"
            onSubmit={console.log("added")}
          >
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Task name"
              className="border border-gray-300 p-2 rounded w-2/3 h-10"
            />
            <input
              type="date"
              value={newTaskDate}
              onChange={(e) => setNewTaskDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-1/3 h-10 text-sm xs:text-black"
            />
            <button
              type="submit"
              id="addTask"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 h-10"
            >
              +Add
            </button>
          </form>
        </div>

        <h2 className="text-xl font-semibold">TODO</h2>
        <ul
          id="uncompletedTaskList"
          className="task-list mb-6 space-y-2 mt-4 mx-2"
        >
          {uncompletedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between  p-2 rounded-md border border-gray-300"
            >
              <span>{task.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{task.date}</span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
            </div>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        <ul id="completedTaskList" className="task-list space-y-2 mt-4 mx-2">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-2 rounded-md border border-gray-300"
            >
              <span>{task.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{task.date}</span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MiddleBar;
