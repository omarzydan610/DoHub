const UserRepository = require("../dataAccess/userDataAccess");
const jwt = require("jsonwebtoken");

class UserController {
  static async getUser(req, res, next) {
    try {
      const { id } = req.user;
      const user = await UserRepository.getUserById(id);
      //   const username = await UserRepository.getUsername(user);
      console.log(req.id);
      console.log(id);

      console.log(user);

      res.status(200).json({
        status: "success",
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error fetching username:", error);
      throw error;
    }
  }
}

module.exports = UserController;
