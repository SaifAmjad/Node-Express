const mongoose=require('mongoose')
const Job=require('../models/Jobs');
const User=require('../models/User')
const asyncHandler=require('../middleware/asyncHandler');
const moment=require('moment')
const{StatusCodes}=require('http-status-codes')
const { UnAuth, NotFound, BadRequest } = require('../errors/customErrors');



const createJob=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    
    const user=await User.findOne({_id:userId});
    if(!user){
        throw new UnAuth('User does not exist');
    }
    const userTemp={...req.body,createdBy:user._id}
    const job=await Job.create(userTemp);

    res.status(StatusCodes.CREATED).json({job});
})

const getAll=asyncHandler(async(req,res)=>{
    const{search,jobStatus,jobType,sort,page}=req.query;
    const userId=req.user.id;
    
    let jobObj={createdBy:userId}
    if(jobStatus){
        jobObj.status=jobStatus;
    }
    if(jobType){
        jobObj.jobType=jobType;
    }
    if(search){
        jobObj.position={$regex:search,$options:'i'}
    }

    let sortVal;
    if(sort==='newest'){
        sortVal='-createdAt';
    }
    if(sort==='oldest'){
        sortVal='createdAt';
    }
    if(sort==='a-z'){
        sortVal='position'
    }
    if(sort==='z-a'){
        sortVal='-position'
    }
    
    const pageNum=Number(page)|| 1;
    const limit=Number(req.query.limit)||10;
    let skip=(pageNum-1)*limit;

    const jobs=await Job.find(jobObj).sort(sortVal).skip(skip).limit(limit);

    const totalJobs=await Job.countDocuments(jobObj);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(200).json({jobs,totalJobs,numOfPages}); 
})

const getJob=asyncHandler(async(req,res)=>{
    const jobId=req.params.id;
    const userId=req.user.id;

    const job=await Job.findOne({_id:jobId,createdBy:userId});
    if(!job){
        throw new NotFound('No Job is found with this id')
    }

    res.status(200).json({job});


})

const updateJob=asyncHandler(async(req,res)=>{
    const JobId=req.params.id;
    const userId=req.user.id;

    if(!req.body.company || !req.body.position){
        throw new BadRequest('Provide full details');
    }

    const job=await Job.findByIdAndUpdate({_id:JobId,createdBy:userId},req.body,{new:true,runValidators:true,})
    if(!job){
        throw new NotFound('No user exist with this id');
    }

    res.status(200).json({job});
})

const deleteJob=asyncHandler(async(req,res)=>{
   const jobId=req.params.id;
   const userId=req.user.id;

   const job=await Job.findByIdAndRemove({_id:jobId,createdBy:userId});
   res.status(200).send()
})


const showStats=asyncHandler(async(req,res)=>{
     const userId=req.user.id;

    let stats1=await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(userId)}},
        {$group:{
            _id:'$status',
            count:{$sum:1}
        }}
    ])
    
    stats1=stats1.reduce((acc,curr)=>{
        const{_id:title,count}=curr;
        acc[title]=count
        return acc;
    },{})
 
    let statsObj={
        pending:stats1.pending || 0,
        interview: stats1.interview|| 0,
        decline:stats1.decline||0
    }

    let stats2=await Job.aggregate([
        {$match: {createdBy:new mongoose.Types.ObjectId(userId)}},
        {$group:{
           _id:{year:{$year:'$createdAt'},month:{$month:'$createdAt'}},
           count:{$sum:1}
        }},
        {$sort:{'_id.year':1,'_id.month':1}},
        {$limit:5}
    
    ])
 
    stats2=stats2.map((val)=>{
        const{count}=val;
        const{year,month}=val._id;

        const date=moment().month(month-1).year(year).format('MMM Y');
        return {date,count}
    })

    res.json({defaultStats:stats1,monthlyApplications:stats2});
}) 

module.exports={createJob,getAll,getJob,updateJob,deleteJob,showStats}