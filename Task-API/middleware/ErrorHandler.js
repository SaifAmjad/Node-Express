const ErrorHandler=(err,req,res,next)=>{
    res.status(500).json({err});
}

module.exports=ErrorHandler;