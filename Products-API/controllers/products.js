const {BadRequest,UnAuth,NotFound}=require('../errors/customError')
const Product=require('../models/productSchema');
const asyncHandler=require('../middleware/asyncHandler')


const createProduct=asyncHandler(async(req,res)=>{
     const{name,email,password,price}=req.body
     
     const product=await Product.create({...req.body,image:req.fileUpload})
     res.json({product})
})

module.exports=createProduct