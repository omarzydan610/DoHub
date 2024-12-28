const clients = new Set();

const addClient = (res) => {
  clients.add(res);
  console.log(`Client connected. Total: ${clients.size}`);
};

const removeClient = (res) => {
  clients.delete(res);
  console.log(`Client disconnected. Total: ${clients.size}`);
};

const sendEvent = (event, data) => {
  console.log(`Broadcasting ${event}:`, data);
  
  clients.forEach((client) => {
    try {
      client.write(`event: ${event}\n`);
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (error) {
      console.error('Error sending event:', error);
      removeClient(client);
    }
  });
};

module.exports = { addClient, removeClient, sendEvent };
