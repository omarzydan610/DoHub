import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/shapes";

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
  registerUser(userData) {
    return axios
      .post(`${API_BASE_URL}/register`, userData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error registering user:", error);
        throw error;
      });
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
