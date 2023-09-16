const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/authenticate')
const testUser=require('../middleware/testUser')
const {createJob,getAll,getJob,updateJob,deleteJob, showStats}=require('../controllers/jobs')


router.get('/stats',authenticate,showStats);
router.get('/',authenticate,getAll);
router.post('/',authenticate,testUser,createJob);
router.get('/:id',authenticate,getJob); 
router.patch('/:id',authenticate,testUser,updateJob);
router.delete('/:id',authenticate,testUser,deleteJob);

module.exports=router; 