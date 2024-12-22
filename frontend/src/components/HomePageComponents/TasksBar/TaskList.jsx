import React from "react";

const TaskList = ({
  tasks,
  title,
  selectedTask,
  handleTaskClick,
  handleToggleCompletion,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 mt-6">{title}</h2>
      <ul className="task-list space-y-2 mt-4 mx-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 italic">No {title.toLowerCase()} tasks</p>
        ) : (
          tasks.map((task) => (
            <div
              style={{ userSelect: "none" }}
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={`flex items-center justify-between p-2 rounded-md border ${
                selectedTask && selectedTask.id === task.id
                  ? "border-blue-500"
                  : "border-gray-300"
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
    </>
  );
};

export default TaskList;
