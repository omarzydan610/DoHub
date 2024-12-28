const express = require("express");
const TaskController = require("../controllers/tasksController");
const { verifyToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/", verifyToken, TaskController.createTask);
router.get("/completed", verifyToken, TaskController.getCompletedTasks);
router.get("/uncompleted", verifyToken, TaskController.getUncompletedTasks);
router.put(
  "/toggle/:collaborative_id",
  verifyToken,
  TaskController.toggleCompleted
);
router.put(
  "/toggle-subtask/:taskId",
  verifyToken,
  TaskController.toggleSubtaskCompleted
);
router.delete("/delete/:taskId", verifyToken, TaskController.deleteTask);
router.get("/subTasks/:parentId", verifyToken, TaskController.getSubTasks);
router.put(
  "/description/:collaborative_id",
  verifyToken,
  TaskController.editDescription
);
router.put("/update/:collaborative_id", verifyToken, TaskController.updateTask);
router.put(
  "/add-collaborator/:taskId/:CollaborateEmail",
  verifyToken,
  TaskController.addCollaborate
);
router.get(
  "/get-collaborators/:taskId",
  verifyToken,
  TaskController.getCollaborators
);

module.exports = router;
