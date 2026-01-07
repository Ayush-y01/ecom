const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express()
const ConnectDb = require('./src/Db/db.connection')
const userRouter = require('./src/routes/user.route.js')
const cookieParser = require('cookie-parser');

ConnectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res) => {
    res.send("hello world");
});

app.use('/users', userRouter);


module.exports = app;