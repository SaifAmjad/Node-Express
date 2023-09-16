const {NotFound}=require('../errors/customErrors');

const notFound=(req,res,next)=>{
    // res.status(404).send('This Route does not exist');
    next(new NotFound('This route does not exist'))
}

module.exports=notFound;