const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express()
const ConnectDb = require('./src/Db/db.connection')
const cookieParser = require('cookie-parser');
const userRouter = require('./src/routes/user.route.js')
const productRouter = require('./src/routes/product.route.js')
const cartRouter = require('./src/routes/cart.route.js')
const orderRouter = require('./src/routes/order.route.js')
const paymentRouter = require('./src/routes/payment.route.js')
const couponRouter = require('./src/routes/coupon.route.js')
const reviewRouter = require('./src/routes/review.route.js')
const returnRouter = require('./src/routes/return.routes.js')
const refundRouter = require('./src/routes/refund.routes.js')
const adminDashboard = require('./src/routes/adminDashboard.route.js')
const adminAnalyics = require('./src/routes/admin.analytics.routes.js')

const bullBoard = require('./src/bullDashboard.js')
require("./src/config/redis.js");

ConnectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/',(req,res) => {
    res.send("hello world");
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/webhook', paymentRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/review', reviewRouter)
app.use('api/return', returnRouter)
app.use('api/refund', refundRouter)
app.use('/api/admin', adminDashboard)
app.use('/api/admin/analytics', adminAnalyics)

app.use("/admin/queues", bullBoard.getRouter())


module.exports = app;