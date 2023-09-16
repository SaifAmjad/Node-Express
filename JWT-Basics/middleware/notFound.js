const notFound=(req,res)=>{
    res.status(401).json({msg:'No Route Found'});
}

module.exports=notFound;