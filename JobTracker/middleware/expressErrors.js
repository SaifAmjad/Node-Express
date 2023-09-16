const{BadRequest,UnAuth,NotFound}=require('../errors/customErrors');
const expressErrors=(err,req,res,next)=>{
    if(err instanceof BadRequest || err instanceof UnAuth || err instanceof NotFound ){
        return res.json({err:err.message,status:err.status}); 
    }
    res.json({err});
}

module.exports=expressErrors;