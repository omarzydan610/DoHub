const express = require("express");
const TaskController = require("../controllers/tasksController");
const { verifyToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/", verifyToken, TaskController.createTask);
router.get("/completed", verifyToken, TaskController.getCompletedTasks);
router.get("/uncompleted", verifyToken, TaskController.getUncompletedTasks);
router.put("/toggle/:taskId", verifyToken, TaskController.toggleCompleted);
router.delete("/delete/:taskId", verifyToken, TaskController.deleteTask);
router.get("/subTasks/:parentId", verifyToken, TaskController.getSubTasks);
router.put("/description/:taskId", verifyToken, TaskController.editDescription);
router.put("/update/:taskId", verifyToken, TaskController.updateTask);

// router.get("/:taskId", verifyToken, TaskController.getTaskById);

module.exports = router;
