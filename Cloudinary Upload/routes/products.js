const express=require('express');
const {uploadLocal,uploadCloud}=require('../controllers/upload')
const router=express.Router();

router.post('/localUpload',uploadLocal)
router.post('cloudUpload',uploadCloud)

module.exports=router;