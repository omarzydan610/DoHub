const express = require("express");
const router = express.Router();
const sseController = require("../controllers/sseController");

// Route for SSE connection
router.get("/events", sseController.sseHandler);

// Route for triggering an event
router.post("/trigger", sseController.triggerEvent);

module.exports = router;
