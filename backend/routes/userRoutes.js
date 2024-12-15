const express = require("express");
const UserController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.get("/", verifyToken, UserController.getUser);

module.exports = router;
