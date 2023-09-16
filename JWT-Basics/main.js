require('dotenv').config();
require('express-async-errors');
const express=require('express');
const notFound=require('./middleware/notFound');
const errorHandler=require('./middleware/error-handler');
const authRoute=require('./routes/authRoute');

const app=express();

const PORT=3000;

app.use(express.static('./public'));
app.use(express.json());

app.get('/',(req,res)=>{
  
})

app.use('/api/auth',authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,()=>{
   console.log(`Listening on port ${PORT}...`);
})
