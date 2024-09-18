// controllers/queueController.js
const connectQueue = require('../config/queueConfig');

exports.enqueueRequest = async (req, res) => {
  const userId = req.userId; // Extracted from the JWT token
  const requestPayload = req.body;

  connectQueue().then((connection) => {
    connection.createChannel((err, channel) => {
      const queue = `${userId}-queue`;

      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(requestPayload)));

      res.status(200).send('Request enqueued');
    });
  }).catch((err) => res.status(500).send('Queue connection error'));
};
