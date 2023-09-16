const express=require('express');
const createProduct=require('../controllers/products')
const upload=require('../controllers/upload')
const router=express.Router();


router.post('/',upload,createProduct);


module.exports=router;