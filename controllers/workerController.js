// controllers/workerController.js
const connectQueue = require('../config/queueConfig');

const processTask = async (task) => {
  console.log('Processing task:', task);
  // Simulate task processing
  return new Promise(resolve => setTimeout(resolve, 1000));
};

exports.startWorker = (userId) => {
  connectQueue().then((connection) => {
    connection.createChannel((err, channel) => {
      const queue = `${userId}-queue`;

      channel.assertQueue(queue, { durable: true });
      channel.consume(queue, async (msg) => {
        const task = JSON.parse(msg.content.toString());
        await processTask(task);
        channel.ack(msg);
      });
    });
  }).catch(console.error);
};
