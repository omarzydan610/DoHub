import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

class UserService {
  static getUsername = async (token) => {
    // try {
    //   const response = await axios.get(`${API_BASE_URL}/user`, {
    //     headers: {
    //       authorization: token,
    //     },
    //   });
    //   return response.data;
    // } catch (error) {
    //   return "username not found";
    // }
    return "username not found";
  };
}

export default UserService;
