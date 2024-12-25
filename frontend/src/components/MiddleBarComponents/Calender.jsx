import React, { useMemo } from "react";
import { format, addDays, isValid, parseISO } from "date-fns";
import { useAppContext } from "../../contexts/AppContext";

const Calendar = () => {
  const { uncompletedTasks, completedTasks, isDarkMode } = useAppContext();
  const allTasks = uncompletedTasks.concat(completedTasks);

  // Generate next 30 days
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 365 }, (_, i) => addDays(today, i));
  }, []);

  // Safely format date
  const formatDate = (date) => {
    try {
      const parsedDate = typeof date === "string" ? parseISO(date) : date;
      return isValid(parsedDate) ? format(parsedDate, "yyyy-MM-dd") : null;
    } catch {
      return null;
    }
  };

  // Group tasks by deadline with validation
  const tasksByDate = useMemo(() => {
    return allTasks.reduce((acc, task) => {
      if (!task.due_date) return acc;

      const dateKey = formatDate(task.due_date);
      if (!dateKey) return acc;

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
      return acc;
    }, {});
  }, [allTasks]);

  return (
    <div className="w-full h-[calc(100vh-7rem)] overflow-x-auto hide-scrollbar">
      <div className="flex gap-4 min-w-max p-4 h-full overflow-x-hidden">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`flex-none w-64 rounded-lg h-full overflow-y-auto
            ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } 
            border shadow-sm`}
          >
            <div
              className={`rounded-t-lg ${
                isDarkMode ? "bg-blue-800" : "bg-blue-500"
              } text-center mb-4 p-2`}
            >
              <div className="font-bold text-white">{format(day, "EEEE")}</div>
              <div className="text-sm text-blue-100">
                {format(day, "MMM d, yyyy")}
              </div>
            </div>

            <div>
              {tasksByDate[formatDate(day)]?.map((task) => (
                <div
                  key={task.id}
                  className={`p-2 mb-2 mx-4 rounded transition-colors
                    ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                >
                  <div className="flex justify-between">
                    <div
                      className={`text-lg ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </div>
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
                    {task.due_date
                      ? new Date(task.due_date).toLocaleString(undefined, {
                          timeStyle: "short",
                        })
                      : "No deadline"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
