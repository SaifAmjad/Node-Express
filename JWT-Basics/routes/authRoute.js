const express=require('express');
const{login,dashboard}=require('../controllers/authJWT');
const authMiddle=require('../middleware/auth');

const router=express.Router();

router.get('/dashboard',authMiddle,dashboard);
router.post('/login',login);

module.exports=router;
