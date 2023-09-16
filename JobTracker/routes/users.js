const express=require('express');
const { register, login, updateUser } = require('../controllers/users');
const authenticate=require('../middleware/authenticate');
const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.patch('/update',authenticate,updateUser)

module.exports=router;