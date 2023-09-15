const errorHandler=(err,req,res,next)=>{
    console.log(err);
    res.status(500).json({msg:'Went wrong',err});
}

module.exports=errorHandler;