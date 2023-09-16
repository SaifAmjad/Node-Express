require('dotenv').config();
const express=require('express');
const expressError=require('./middleware/expressErrors')
const connectDb = require('./db/connect');
const product=require('./routes/products');
const fileUpload=require('express-fileupload')

const app=express();

const port=3000; 


app.use(express.static('./public')) 
app.use(express.json())
app.use(fileUpload({useTempFiles:true}))

app.get('/',(req,res)=>{
    res.send('Main');
})

app.use('/api/v1/product',product)
 
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