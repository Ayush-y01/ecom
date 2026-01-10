const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express()
const ConnectDb = require('./src/Db/db.connection')
const cookieParser = require('cookie-parser');
const userRouter = require('./src/routes/user.route.js')
const productRouter = require('./src/routes/product.route.js')

ConnectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/',(req,res) => {
    res.send("hello world");
});

app.use('/users', userRouter);
app.use('/products', productRouter)


module.exports = app;