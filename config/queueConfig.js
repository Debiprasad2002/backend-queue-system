// config/queueConfig.js
const amqp = require('amqplib/callback_api');

const connectQueue = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.AMQP_URL, (err, connection) => {
      if (err) reject(err);
      resolve(connection);
    });
  });
};

module.exports = connectQueue;
