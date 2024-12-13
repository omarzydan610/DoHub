import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

class LoginRegisterService {
  // Login user
  loginUser(credentials) {
    return axios
      .post(`${API_BASE_URL}/login`, credentials)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error logging in:", error);
        throw error;
      });
  }

  // Register user
  async registerUser(userData) {
    try {
      const response = await axios
        .post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  // Optional: Logout user
  logoutUser() {
    return axios
      .post(`${API_BASE_URL}/logout`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error logging out:", error);
        throw error;
      });
  }
}

export default new LoginRegisterService();
