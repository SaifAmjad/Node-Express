const Mongoose=require('mongoose');

const jobSchema=new Mongoose.Schema({
    position:{
        type:String,
        required:[true,'Please provide position'],
        minLength:3
    },
    company:{
        type:String,
        required:[true,'Please provide company'],
        minLength:3
    },
    jobLocation:{
        type:String,
        required:[true,'Please Provide job location'],
        default:'my city',
        minLength:3
    },
    status:{
        type:String,
        enum:['pending','interview','declined'],
        default:'pending'
    },
    jobType:{
        type:String,
        enum:['full-time','part-time','internship'],
        default:'full-time'
    },
    createdBy:{
        type:Mongoose.Types.ObjectId,
        ref:'users',
        required:[true,'Please provide user']
    }

},{timestamps:true})

module.exports=Mongoose.model('jobs',jobSchema);