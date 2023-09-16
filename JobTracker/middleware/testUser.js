const { BadRequest } = require("../errors/customErrors")

const testUser=(req,res,next)=>{
    if(!req.user.testUser){
        next(new BadRequest('This user is Read only'))
    }
    next();
}

module.exports=testUser;