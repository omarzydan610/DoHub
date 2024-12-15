import { createContext, useContext, useState, useEffect } from "react";
import UserService from "../Service/UserService";
import TasksService from "../Service/TasksService";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const getUnCompletedTasks = async () => {
    const response = await TasksService.getUncompletedTasks();
    setUncompletedTasks(response.data);
  };
  const getCompletedTasks = async () => {
    const response = await TasksService.getCompletedTasks();
    setCompletedTasks(response.data);
  };

  const getUsername = async (token) => {
    const response = await UserService.getUsername(token);
    setUsername(response);
  };

  useEffect(
    () => async () => {
      if (localStorage.getItem("x-access-token")) {
        await getUnCompletedTasks();
        await getCompletedTasks();
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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
