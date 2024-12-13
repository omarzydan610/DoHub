import { createContext, useContext, useState } from "react";
import UserService from "../Service/UserService";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  const getUsername = async (token) => {
    const response = await UserService.getUsername(token);
    setUsername(response);
  };

  const contextValue = {
    username,
    getUsername,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
