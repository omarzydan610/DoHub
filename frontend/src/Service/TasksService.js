import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

class TasksService {
  static addTask = async (task) => {
    const response = await axios.post(`${API_BASE_URL}/tasks/`, task, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
    return response.data;
  };

  static getCompletedTasks = async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks/completed`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
    return response.data;
  };

  static getUncompletedTasks = async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks/uncompleted`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
    return response.data;
  };
}

export default TasksService;
