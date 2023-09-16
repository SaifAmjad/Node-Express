const { NotFound, BadRequest } = require('../errors/customError')
const fs=require('fs')
const cloudinary=require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret:process.env.API_SECRET
})

const upload=async(req,res,next)=>{
    const imageFile=req.files.image

    if(!imageFile){
        return res.status(400).json({ error: 'Image file is missing' });
    }

    try {

        const upload=await cloudinary.uploader.upload(imageFile.tempFilePath,{
         use_filename:true,
         folder:'uploadCloud-2'
        })
     
        if(!upload.secure_url){
         return res.status(400).json({ error: 'Image file is missing' });
        }

        fs.unlinkSync(imageFile.tempFilePath)
        
        req.fileUpload=upload.secure_url;
        
        next();

    } catch (error) { 
        next(error)
    }


}

module.exports=upload