const mongoose = require("mongoose");

const DBconnect=(connection)=>{
    mongoose
      .connect(connection)
      .then(() => console.log("Connected to DB"))
      .catch((err) => console.log(err));

}

module.exports=DBconnect
