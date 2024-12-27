const sseCore = require("../services/sseService");

// Handles the SSE connection
const sseHandler = (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Add the client to the list
    sseCore.addClient(res);

    // Send an initial event to confirm connection
    res.write(`event: connected\n`);
    res.write(
        `data: ${JSON.stringify({ message: "Connected to SSE server" })}\n\n`
    );

    // Remove the client on disconnect
    req.on("close", () => {
        sseCore.removeClient(res);
        res.end();
    });
};

// Sends an event from another endpoint
const triggerEvent = (req, res) => {
    const { event, message } = req.body;

    // Use the core to broadcast the event
    sseCore.sendEvent(event || "message", { message });

    res.json({ success: true, message: "Event broadcasted" });
};

module.exports = {
    sseHandler,
    triggerEvent,
};
