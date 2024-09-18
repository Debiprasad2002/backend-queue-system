// queues/queueManager.js

const amqp = require('amqplib');
const { handleTask } = require('./taskProcessor');

const QUEUE_NAME = 'client_requests';

async function connectToQueue() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });
        console.log(`Connected to RabbitMQ and listening on ${QUEUE_NAME} queue`);

        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg) {
                const clientTask = JSON.parse(msg.content.toString());
                console.log(`Received task from Client ${clientTask.clientId}`);

                // Process task using taskProcessor
                await handleTask(clientTask);

                // Acknowledge message after processing
                channel.ack(msg);
            }
        }, { noAck: false });

    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
}

module.exports = { connectToQueue };
