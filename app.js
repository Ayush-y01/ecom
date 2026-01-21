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

ConnectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/',(req,res) => {
    res.send("hello world");
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


module.exports = app;