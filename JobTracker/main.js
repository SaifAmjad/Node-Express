require('dotenv').config()
const express=require('express');
const connectDb=require('./db/connect');
const notFound=require('./middleware/notFound');
const expressErrors=require('./middleware/expressErrors');
const userRoute=require('./routes/users');
const jobRoute=require('./routes/jobs');
const path=require('path');
const app=express();

const PORT=process.env.PORT || 5000; 

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json())

app.use('/api/v1/auth',userRoute); 
app.use('/api/v1/jobs',jobRoute)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

app.use(notFound);
app.use(expressErrors);


const start=async()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Listening on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();   
