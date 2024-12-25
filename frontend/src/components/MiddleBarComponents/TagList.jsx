import { useAppContext } from "../../contexts/AppContext";
const TagList = () => {
  const { selectedTagTasks, isDarkMode } = useAppContext();

  return (
    <div>
      {[...selectedTagTasks]
        .sort((a, b) => {
          // Sort by isCompleted (0 comes first)
          if (a.completed !== b.completed) {
            return a.completed - b.completed;
          }
          // If same completion status, maintain original order
          return 0;
        })
        .map((task) => (
          <div
            key={task.id}
            className={`p-2 mb-4 h-20  mx-4 rounded transition-colors
            ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <div
                className={`text-lg pb-2 w-40 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {task.title}
              </div>
              <span
                className={`px-3 h-6 pt-1 rounded-full text-xs ${
                  task.priority === 3
                    ? isDarkMode
                      ? "bg-red-900/50 text-red-200"
                      : "bg-red-100 text-red-700"
                    : task.priority === 2
                    ? isDarkMode
                      ? "bg-amber-900/50 text-amber-200"
                      : "bg-amber-100 text-amber-700"
                    : isDarkMode
                    ? "bg-emerald-900/50 text-emerald-200"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {task.priority === 3
                  ? "High"
                  : task.priority === 2
                  ? "Medium"
                  : "Low"}
              </span>
              <div
                className={`text-lg font-bold pr-2 mt-1 ${
                  task.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {task.completed ? "✓" : "✗"}
              </div>
            </div>

            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              DeadLine:
              {task.due_date
                ? new Date(task.due_date).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "No deadline"}
            </div>
          </div>
        ))}
    </div>
  );
};
export default TagList;
