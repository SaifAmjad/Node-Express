const jwt=require('jsonwebtoken');
const { UnAuth } = require('../errors/customErrors');


const authenticate=async(req,res,next)=>{
    const authHead=req.headers.authorization;
    if(!authHead || !authHead.startsWith('Bearer ')){
        next( new UnAuth('Token is not Authenticated'));
    } 

    const token=authHead.split(' ')[1];
    try {
        const decode=await jwt.verify(token,process.env.SECRET); 
        let testUser;
        if(decode.id==='64ecb2786b2e55c69a997ae6'){
            testUser=true;
        }
        req.user={id:decode.id,testUser}
        next();
    } catch (error) {
        next(error);
    }

    
}

module.exports=authenticate;