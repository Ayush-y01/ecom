const Queue = require('bull')

const orderQueue = new Queue("order-queue", {
  redis: {
    host: process.env.REDIS_HOST || "redis",
    port: 6379,
  },
});


module.exports = orderQueue