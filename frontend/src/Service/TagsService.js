import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

class TagsService {
  static addTag = async (tag) => {
    console.log();
    const response = await axios.post(
      `${API_BASE_URL}/tags/${tag}`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
    return response.data;
  };

  static deleteTag = async (tagId) => {
    await axios.delete(`${API_BASE_URL}/tags/${tagId}`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
  };

  static getUserTags = async () => {
    const response = await axios.get(`${API_BASE_URL}/tags/`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
    return response.data;
  };

  static getTagsByTaskId = async (taskId) => {
    const response = await axios.get(`${API_BASE_URL}/tags/${taskId}`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
    return response.data;
  };

  static getTasksByTagId = async (tagId) => {
    const response = await axios.get(`${API_BASE_URL}/tags/tasks/${tagId}`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
    return response.data;
  };

  static addTagToTask = async (taskId, tagId) => {
    await axios.post(
      `${API_BASE_URL}/tags/addTag/${taskId}/${tagId}`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("x-access-token"),
        },
      }
    );
  };

  static removeTagFromTask = async (taskId, tagId) => {
    await axios.delete(`${API_BASE_URL}/tags/removeTag/${taskId}/${tagId}`, {
      headers: {
        authorization: localStorage.getItem("x-access-token"),
      },
    });
  };
}

export default TagsService;
