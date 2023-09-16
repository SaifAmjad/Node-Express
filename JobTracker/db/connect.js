const Mongoose = require("mongoose");

const connectDb = (connection) => {
  Mongoose.connect(connection)
    .then(() => console.log("Connected to db"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
