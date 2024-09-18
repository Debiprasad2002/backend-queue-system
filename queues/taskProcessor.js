// queues/taskProcessor.js

const { logRequest } = require('../utils/logger');

async function handleTask(clientTask) {
    try {
        console.log(`Processing task for Client ${clientTask.clientId}`);

        // Simulate task processing
        await new Promise((resolve) => setTimeout(resolve, 2000));  // Simulate task duration

        console.log(`Completed task for Client ${clientTask.clientId}`);

        // Log task processing
        logRequest(clientTask);

    } catch (error) {
        console.error(`Failed to process task for Client ${clientTask.clientId}:`, error);
    }
}

module.exports = { handleTask };
