const express = require("express");
const TaskController = require("../controllers/tasksController");
const { verifyToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/", verifyToken, TaskController.createTask);
router.get("/completed", verifyToken, TaskController.getCompletedTasks);
router.get("/uncompleted", verifyToken, TaskController.getUncompletedTasks);
router.get("/:taskId", verifyToken, TaskController.getTaskById);
router.put("/:taskId", verifyToken, TaskController.updateTask);
router.delete("/:taskId", verifyToken, TaskController.deleteTask);

module.exports = router;
