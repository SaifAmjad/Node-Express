const { BadRequest, NotFound, UnAuth } = require('../errors/customErrors');
const asyncHandler=require('../middleware/asyncHandler');
const User=require('../models/User');


const register=asyncHandler(async(req,res)=>{
    
    const user=await User.create(req.body);
    const token=await user.getToken();
    res.json( {user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
        token,
      },
    })

})

const login=asyncHandler(async(req,res)=>{
      const{email,password}=req.body;

      if(!email || !password){
        throw new BadRequest('Please Provide Email and Password');
      }

    const user=await User.findOne({email});
    if(!user){
        throw new NotFound('Email does not exist');
    }
 
    const comparePass=await user.comparePass(password);
    if(!comparePass){
        throw new UnAuth('Incorrect password');
    }


    const token=await user.getToken();

    res.json({
        user: {
          email: user.email,
          lastName: user.lastName,
          location: user.location,
          name: user.name,
          token,
        },
      });

})

const updateUser=asyncHandler(async(req,res)=>{
    const{name,lastname,email,location}=req.body;

    if(!name || !lastname || !email || !location){
        throw new BadRequest('Please fill in the credentials');
    }

    const userId=req.user.id;
    const user=await User.findOne({_id:userId});

    if(!user){
        throw new NotFound('User does not exist');
    }

    await user.updateOne({name,lastname,email,location});
    const token=await user.getToken();

    res.status(200).json({
        user: {
          email: user.email,
          lastName: user.lastName,
          location: user.location,
          name: user.name,
          token,
        },
      })

})

module.exports={register,login,updateUser}