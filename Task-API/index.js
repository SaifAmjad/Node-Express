const express=require('express');
const taskRoute=require('./routes/tasks');
const Db=require('./db/connect');
require('dotenv').config();
const ErrorHandler=require('./middleware/ErrorHandler')
const app=express();
const port=process.env.PORT || 4000;

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks',taskRoute);
app.use((req,res)=>{
   res.status(404).send('<h1>Not found</h1>');
})
app.use(ErrorHandler);
 
const startServer=async()=>{
   try {
      await Db(process.env.CONNECT_MONGO);

      app.listen(port,()=>{
         console.log(`Listening on Port ${port}`);
      })

   } catch (error) {
      console.log(error);
   }
   
}

startServer();


