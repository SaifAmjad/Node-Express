require('dotenv').config();
const express=require('express');
const fileUpload=require('express-fileupload');
const uploadRouter=require('./routes/products')
const cloudinary=require('cloudinary').v2;
const expressError=require('./middleware/expressErrors')
const connectDb = require('./db/connect');
const app=express();

const port=3000; 

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

app.use(express.static('./public')) 
app.use(fileUpload({useTempFiles:true}));
 
app.get('/',(req,res)=>{
    res.send('Main');
    
})

app.use('/api/v1/upload',uploadRouter); 


app.use(expressError);

const start=async()=>{
    try {
        await connectDb(process.env.MONGO_UI)
        app.listen(port,()=>{
            console.log(`Listening on port ${port}...`)
        })
        
    } catch (error) {
        
    }
}

start();