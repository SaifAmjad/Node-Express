require('dotenv').config(); 
require('express-async-errors');
const express=require('express');
const connectDB=require('./db/connect');
const errorHandler=require('./middleware/errorHandler');
const notFound=require('./middleware/notFound');
const productRoute=require('./routes/productsRoute');
const app=express();
const PORT=5000;  

app.use(express.json());

app.get('/',(req,res)=>{ 
    res.send('<h1>Home</h1>');
})

app.use('/api/v1/products',productRoute);

app.use(notFound);
app.use(errorHandler);

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_UI);

        app.listen(PORT,()=>{
            console.log(`Listening at port ${PORT}...`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

start();