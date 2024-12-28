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

  static toggleTask = async (collaborative_id, taskData) => {
    console.log(taskData);
    await axios.put(
      `${API_BASE_URL}/tasks/toggle/${collaborative_id}`,
      taskData,
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
  };

  static toggleSubTask = async (taskId, taskData) => {
    console.log(taskData);
    await axios.put(
      `${API_BASE_URL}/tasks/toggle-subtask/${taskId}`,
      taskData,
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
  };

  static deleteTask = async (taskId) => {
    await axios.delete(`${API_BASE_URL}/tasks/delete/${taskId}`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
  };

  static editDescription = async (collaborative_id, newDescription) => {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/description/${collaborative_id}`,
      newDescription,
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
    return response.data;
  };
  static updateTask = async (collaborative_id, taskData) => {
    await axios.put(
      `${API_BASE_URL}/tasks/update/${collaborative_id}`,
      taskData,
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
  };

  static addCollaborator = async (taskId, CollaborateEmail) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/tasks/add-collaborator/${taskId}/${CollaborateEmail}`,
        {},
        {
          headers: {
            authorization: localStorage.getItem("x-access-token"),
          },
        }
      );
      return response.data;
    } catch (err) {
      throw err.response;
    }
  };

  static getCollaborators = async (taskId) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("getCollabor");

    const response = await axios.get(
      `${API_BASE_URL}/tasks/get-collaborators/${taskId}`,
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
    return response.data;
  };
}

export default TasksService;
