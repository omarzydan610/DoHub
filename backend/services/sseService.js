const clients = [];

// Add a new client to the list
const addClient = (res) => {
    clients.push(res);
    console.log(`New client connected. Total clients: ${clients.length}`);
};

// Remove a client on disconnection
const removeClient = (res) => {
    const index = clients.indexOf(res);
    if (index !== -1) {
        clients.splice(index, 1);
        console.log(`Client disconnected. Total clients: ${clients.length}`);
    }
};

// Broadcast an event to all connected clients
const sendEvent = (event, data) => {
    clients.forEach((client) => {
        client.write(`event: ${event}\n`);
        client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
};

module.exports = {
    addClient,
    removeClient,
    sendEvent,
};
