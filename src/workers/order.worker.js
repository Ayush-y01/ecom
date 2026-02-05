const Queue = require('bull')

const orderQueue = new Queue("order-queue", {
    redis:{
        host:"127.0.0.1",
        port:6379
    }
})
// console.log("📦 Order worker started");
orderQueue.process("order-email", async (job) => {
    console.log("📧 Sending order email:", job.data.orderId);
    await new Promise((res) => setTimeout(res, 3000))
})

orderQueue.process("analytics", async (job) => {
    console.log("📊 Updating analytics for:", job.data.orderId);
    await new Promise((res) => setTimeout(res, 1500))
})