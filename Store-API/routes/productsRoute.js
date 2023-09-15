const express=require('express');
const {allproducts,allproductsstatic}=require('../controllers/allProducts')
const router=express.Router();

router.get('/',allproducts);
router.get('/static',allproductsstatic);

module.exports=router;