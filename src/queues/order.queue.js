const Queue = require('bull')

const orderQueue = new Queue("order-queue",{
    redis: {
        host: "127.0.0.1",
        port: 6379
    }
})

module.exports = orderQueue