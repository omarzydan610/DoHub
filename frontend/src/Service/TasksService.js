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

  static addSubTask = async (task) => {
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

  static getSubTasks = async (parentId) => {
    const response = await axios.get(
      `${API_BASE_URL}/tasks/subTasks/${parentId}`,
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
    return response.data;
  };

  static toggleTask = async (taskId, taskData) => {
    console.log(taskData);
    await axios.put(`${API_BASE_URL}/tasks/toggle/${taskId}`, taskData, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
  };

  static deleteTask = async (taskId) => {
    await axios.delete(`${API_BASE_URL}/tasks/delete/${taskId}`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
  };

  static editDescription = async (taskId, newDescription) => {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/description/${taskId}`,
      newDescription,
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
    return response.data;
  };
  static updateTask = async (taskId, taskData) => {
    await axios.put(`${API_BASE_URL}/tasks/update/${taskId}`, taskData, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
  };
}

export default TasksService;
