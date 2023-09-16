const {BadRequest,UnAuthorized}=require('../errors/custom-error');

const errorHandler=(err,req,res,next)=>{
      if(err instanceof BadRequest || err instanceof UnAuthorized){
        return res.status(err.status).json({msg:err.message});
      }
      return res.status(500).send('Something went wrong');

}

module.exports=errorHandler;