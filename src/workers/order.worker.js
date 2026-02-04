const Queue = require('bull')

const orderQueue = new Queue("order-queue", {
    redis:{
        host:"127.0.0.1",
        port:6379
    }
})
// console.log("📦 Order worker started");
orderQueue.process(async (job) => {
    await new Promise((res) => setTimeout(res, 3000))
})