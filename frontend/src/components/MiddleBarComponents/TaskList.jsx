import React from "react";

const TaskList = ({
  tasks,
  title,
  selectedTask,
  handleTaskClick,
  handleToggleCompletion,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <ul className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm italic">
            No {title.toLowerCase()} tasks
          </p>
        ) : (
          tasks.map((task) => (
            <div
              style={{ userSelect: "none" }}
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`group flex items-center justify-between p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                selectedTask && selectedTask.id === task.id
                  ? "bg-blue-50 border-blue-500 shadow-sm"
                  : "bg-white border-transparent hover:bg-gray-50"
              } border`}
            >
              <span className="font-medium text-gray-700">{task.title}</span>
              <div className="flex items-center space-x-4">
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
                  className="h-5 w-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
