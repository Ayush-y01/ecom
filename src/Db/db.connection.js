const mongoose = require('mongoose')

function ConnectDb() {
    mongoose.connect(process.env.MONGODB_URI,)
    .then(()=>{
        console.log("Database connected..");
    })
    .catch((err)=>{
        console.log(err,"database connection problem!!!!");
        
    })
}

module.exports = ConnectDb;
