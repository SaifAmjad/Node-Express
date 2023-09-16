const express=require('express');
const multer=require('multer');
const middle=require('./middle')
const app=express();

const PORT=4000;

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploadFile/');
    },
    filename: function(req,file,cb){
     
     cb(null,file.originalname);
    }
})

const upload=multer({storage:storage});

app.use(express.static('./public'));
app.use(express.urlencoded({extended:false})); //14148

app.get('/',(req,res)=>{ 
    
})

app.post('/upload',[upload.single("uploadfile1"),middle()],(req,res)=>{
    res.redirect('/');

})

app.listen(PORT,()=>{
   console.log(`Listening on port ${PORT}...`); 
})