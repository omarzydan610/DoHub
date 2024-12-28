const sseCore = require("../services/sseService");

const sseHandler = (req, res) => {
  // Set headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  // Send initial connection message
  res.write('data: {"message": "Connected to SSE"}\n\n');

  // Add heartbeat to prevent timeout
  const heartbeat = setInterval(() => {
    res.write(":\n\n"); // Comment line as heartbeat
  }, 30000);

  // Add client to SSE core
  sseCore.addClient(res);

  // Handle client disconnect
  req.on("close", () => {
    clearInterval(heartbeat);
    sseCore.removeClient(res);
  });
};

const triggerEvent = (req, res) => {
  const { event, message } = req.body;
  if (!event || !message) {
    return res.status(400).json({ error: "Event and message are required" });
  }

  sseCore.sendEvent(event, { message, timestamp: new Date().toISOString() });
  res.json({ success: true, message: "Event broadcasted" });
};

module.exports = { sseHandler, triggerEvent };
