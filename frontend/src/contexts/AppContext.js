import { createContext, useContext, useState, useEffect } from "react";
import UserService from "../Service/UserService";
import TasksService from "../Service/TasksService";
import TagsService from "../Service/TagsService";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("DarkMode") === "true" ? true : false
  );
  const [username, setUsername] = useState(null);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [eventChange, setEventChange] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [selectedTaskTags, setSelectedTaskTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState("My List");
  const [selectedTagTasks, setSelectedTagTasks] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const getUnCompletedTasks = async () => {
    const response = await TasksService.getUncompletedTasks();
    setUncompletedTasks(response.data);
  };
  const getCompletedTasks = async () => {
    const response = await TasksService.getCompletedTasks();
    setCompletedTasks(response.data);
  };

  const getSubTasks = async (parendId) => {
    const response = await TasksService.getSubTasks(parendId);
    setSubtasks(response.data);
  };

  const getUsername = async (token) => {
    const response = await UserService.getUsername(token);
    console.log(response);
    setUsername(response);
  };

  const getUserTags = async () => {
    const response = await TagsService.getUserTags();
    console.log(response.data);
    setUserTags(response.data);
  };

  const getcollaborators = async (taskId) => {
    try {
      const response = await TasksService.getCollaborators(taskId);
      console.log(response.data);
      setCollaborators(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTaskTags = async (taskId) => {
    const response = await TagsService.getTagsByTaskId(taskId);
    console.log("tasktags", response.data);
    setSelectedTaskTags(response.data);
  };

  useEffect(
    () => async () => {
      if (localStorage.getItem("x-access-token")) {
        await getUnCompletedTasks();
        await getCompletedTasks();
        await getUserTags();
      }
    },
    [username]
  );

  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let eventSource;

    const connectSSE = () => {
      eventSource = new EventSource("http://localhost:8081/sse/events");

      eventSource.onopen = () => {
        console.log("SSE Connected");
      };

      eventSource.addEventListener("task", async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Task event received:", data);
          await getCompletedTasks();
          await getUnCompletedTasks();
          setEventChange((prev) => !prev);

          // setSelectedTask(completedTasks.filter(selectedTask.id==))
          // Handle task updates here
        } catch (error) {
          console.error("Error parsing SSE data:", error);
        }
      });

      eventSource.onerror = (error) => {
        console.error("SSE Error:", error);
        eventSource.close();
        // Reconnect after 5 seconds
        setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      console.log(events);
    }
  }, [events]);

  const contextValue = {
    username,
    getUsername,
    uncompletedTasks,
    setUncompletedTasks,
    completedTasks,
    setCompletedTasks,
    getUnCompletedTasks,
    getCompletedTasks,
    selectedTask,
    setSelectedTask,
    subtasks,
    setSubtasks,
    getSubTasks,
    userTags,
    setUserTags,
    getUserTags,
    selectedTaskTags,
    setSelectedTaskTags,
    getTaskTags,
    isDarkMode,
    setIsDarkMode,
    activeCategory,
    setActiveCategory,
    selectedTagTasks,
    setSelectedTagTasks,
    collaborators,
    setCollaborators,
    getcollaborators,
    eventChange,
    setEventChange,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
