const mongoose=require('mongoose');

const TasksSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    completed: Boolean

})

module.exports=mongoose.model('tasks',TasksSchema); 