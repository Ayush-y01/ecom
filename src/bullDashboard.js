const { createBullBoard } = require('@bull-board/api')
const { BullAdapter } = require('@bull-board/api/bullAdapter')
const { ExpressAdapter } = require('@bull-board/express')

const orderQueue = require('./queues/order.queue')

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath("/admin/queues")

createBullBoard({
    queues: [new BullAdapter(orderQueue)],
    serverAdapter
})

module.exports = serverAdapter