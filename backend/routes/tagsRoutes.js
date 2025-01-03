const express = require("express");
const TagsController = require("../controllers/tagsController");
const { verifyToken } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/:tag", verifyToken, TagsController.createTag);
router.delete("/:tagId", verifyToken, TagsController.deleteTag);
router.get("/", verifyToken, TagsController.getTags);
router.get("/:taskId", verifyToken, TagsController.getTagsByTaskId);
router.get("/tasks/:tagId", verifyToken, TagsController.getTasksByTagId);

router.post("/addTag/:taskId/:tagId", verifyToken, TagsController.addTagToTask);
router.delete(
  "/removeTag/:taskId/:tagId",
  verifyToken,
  TagsController.removeTagFromTask
);

module.exports = router;
