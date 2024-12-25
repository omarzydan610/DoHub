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

  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [selectedTaskTags, setSelectedTaskTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState("My List");
  const [selectedTagTasks, setSelectedTagTasks] = useState([]);
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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
