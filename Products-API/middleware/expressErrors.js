const {BadRequest,UnAuth,NotFound}=require('../errors/customError')

const expressErrors=(err,req,res,next)=>{
    if(err instanceof BadRequest || err instanceof UnAuth || err instanceof NotFound ){
        return res.status(err.status).json({msg:err.msg})
    }
    
    res.status(500).json(err);
 
}

module.exports=expressErrors;