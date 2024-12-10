const authService = require("../service/authService");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginService(email, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error111" });
  }
};
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userData = { name, email, password };
    const token = await authService.registerService(userData);
    return res.status(200).json({ message: "Register successful", token });
  } catch (error) {
    if(error.message === "Email already exists"){
        return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginController,
  registerController,
};
