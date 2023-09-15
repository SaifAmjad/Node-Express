const express=require('express');
const {getTask,createTask,getTaskId,editTask,deleteTask}=require('../controllers/taskware')
const router=express.Router();


router.get('/',getTask);
router.post('/',createTask);
router.get('/:id',getTaskId);
router.patch('/:id',editTask);
router.delete('/:id',deleteTask);


module.exports=router;
