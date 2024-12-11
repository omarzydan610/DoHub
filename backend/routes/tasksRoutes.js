const express = require("express");
const TaskController = require("../controllers/tasksController");

const router = express.Router();

router.post("/", TaskController.createTask);
router.get("/user/:userId", TaskController.getAllTasks);
router.get("/:taskId", TaskController.getTaskById);
router.put("/:taskId", TaskController.updateTask);
router.delete("/:taskId", TaskController.deleteTask);

// Additional routes
router.get("/user/:userId/completed", TaskController.getCompletedTasks);
router.get(
  "/user/:userId/priority/:priorityId",
  TaskController.getTasksByPriority
);
router.get("/user/:userId/tag/:tagId", TaskController.getTasksByTag);

module.exports = router;
