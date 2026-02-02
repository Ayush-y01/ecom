const { createClient } = require("redis")

const redisClient = createClient({
    url: "redis://127.0.0.1:6379"
})

redisClient.on("error", (err) => {
    console.error("Redis Error", err)
})

redisClient.connect().then(() => console.log("redis Connected")).catch(console.error)

module.exports = redisClient