import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

class LoginRegisterService {
  // Login user
  static loginUser = async (credentials) => {
    return axios
      .post(`${API_BASE_URL}/login`, credentials)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        throw error;
      });
  };

  // Register user
  static registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
}

export default LoginRegisterService;
