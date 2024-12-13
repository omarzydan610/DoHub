const jwt = require("jsonwebtoken");
const userDataAccess = require("../dataAccess/userDataAccess");
const dotenv = require("dotenv");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  console.log("line 7", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    console.log("before decoded");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("after decoded", decoded);
    const user = await userDataAccess.checkUser(decoded.id);
    console.log("line 14", user, decoded);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  verifyToken,
};
