const notFound=(req,res)=>{
      res.status(401).send('<h1>Not Found</h1>');
}

module.exports=notFound;