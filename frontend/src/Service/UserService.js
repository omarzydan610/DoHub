import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

class UserService {
  static getUsername = async (token) => {
    try {
      console.log("user");
      const response = await axios.get(`${API_BASE_URL}/user`, {
        headers: {
          authorization: token,
        },
      });
      console.log(response.data.data.name);
      return response.data.data.name;
    } catch (error) {
      return "username not found";
    }
  };
}

export default UserService;
