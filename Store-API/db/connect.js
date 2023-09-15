const Mongoose = require("mongoose");

let connectDB = (connection) => {
  return Mongoose.connect(connection)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports=connectDB;