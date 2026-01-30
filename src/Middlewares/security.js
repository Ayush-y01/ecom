const rateLimit = require("express-rate-limit")
const helmet = require("helmet")

exports.security = app =>{
    app.use(helmet())
    app.use("/api",rateLimit({ windowMs: 15*60*1000, max: 200 }))
}