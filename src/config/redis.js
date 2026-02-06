const { createClient } = require("redis")

const redisHost = process.env.REDIS_HOST || "127.0.0.1";

const redisClient = createClient({
    url: `redis://${redisHost}:6379`
})

redisClient.on("error", (err) => {
    console.error("Redis Error", err)
})

redisClient.connect().then(() => console.log("redis Connected")).catch(console.error)

module.exports = redisClient