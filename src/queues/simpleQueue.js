const redisClient = require('../config/redis')

async function addJob(data) {
    await redisClient.lPush("emailQueue", JSON.stringify(data))
}

async function processJob() {
    const job = await redisClient.brPop("emailQueue", 0)
    return JSON.parse(job.element)
}

module.exports = { addJob, processJob}