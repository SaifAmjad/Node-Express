const {BadRequest}=require('../errors/custom-error');
const jwt=require('jsonwebtoken');

let rand=0;

const login=async(req,res)=>{
    const{username,password}=req.body;

    if(!username || !password){
        throw new BadRequest('Please Provide credentials');
    }
    rand++;
    const id=new Date().getDate()+rand
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'20d'});
    res.status(200).json({msg:'User Success',token});
}

const dashboard=(req,res)=>{
    const quizNum=Math.floor(Math.random()*100);
    res.status(200).json({msg:'Success',valid:`Here is your Lucky number ${quizNum}, ${req.user.username}`});
}

module.exports={login,dashboard};