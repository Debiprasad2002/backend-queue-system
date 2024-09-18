// routes/queueRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const amqp = require('amqplib');

const QUEUE_NAME = 'client_requests';

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// POST /enqueue - Enqueue a task to the user's queue
router.post('/enqueue', authenticateToken, async (req, res) => {
    try {
        const { task } = req.body;
        const clientId = req.user.userId;

        // Connect to RabbitMQ and enqueue the task
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        const message = JSON.stringify({ clientId, task });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
        console.log(`Enqueued task for Client ${clientId}`);

        res.status(200).json({ message: 'Task enqueued successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to enqueue task', error });
    }
});

module.exports = router;
