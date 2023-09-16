const mongoose = require("mongoose");

const connectDb = (connection) => {
  mongoose.connect(connection).then(() => {
    console.log("Connected to db")
    }).catch((err)=>{
        console.log(err)
    })
};

module.exports = connectDb;
