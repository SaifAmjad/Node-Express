const Tasks=require('../models/tasks');
const asyncWrapper=require('../middleware/asyncWrapper');

const getTask=asyncWrapper(async(req,res)=>{
    
       const tasks=await Tasks.find({});
        if(!tasks){
            return res.status(404).json({msg:"Cant get any Tasks"});
        }
        res.status(200).json({tasks});
        
})

const createTask=asyncWrapper(async(req,res)=>{
   
        const data=req.body;
        const taskCreate=await Tasks.create(data);
        if(!taskCreate){
            return res.status(404).json({msg:"Can't create task"});
        }
        res.status(201).json({taskCreate});
})
 
const getTaskId=asyncWrapper(async(req,res)=>{
    
        const {id}=req.params;
        const task= await Tasks.findOne({name:id});
        if(!task){
            return res.status(404).json({msg:`Cant find any id with ${id}`});
        }
        res.status(201).json({task})

})

const editTask=asyncWrapper(async(req,res)=>{
     
        const {id}=req.params
        const {name}=req.body

        const task=await Tasks.findByIdAndUpdate({_id:id},req.body,{
            new:true,
            runValidators:true
        });
        res.status(201).json({task})

})

const deleteTask=asyncWrapper(async(req,res)=>{
   
        const {id}=req.params;
        const findTask=await Tasks.findOne({_id:id});
        if(!findTask){
            return res.status(404).json({msg:`Can't find any Id of ${id}`});
        }
        await Tasks.deleteOne(findTask);
        res.status(201).json({Success:"Deletion Implemented"});
        
      
})

module.exports={getTask,createTask,getTaskId,editTask,deleteTask};