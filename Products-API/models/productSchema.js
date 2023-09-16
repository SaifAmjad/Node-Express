const Mongoose=require('mongoose');
const bycrpt=require('bcryptjs')

const productSchema= new Mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please Provide name '],
  },
  email:{
    type:String,
    required:[true,'Please Provide your email'],
  },
  password:{
    type:String,
    required:[true,'Please Provide your password']
  },
  price:{
     type:Number,
     required:[true,'Please Provide your password']
  },
  image:{
    type:String,
    required:[true,'Provide image']
  }           

})

productSchema.pre('save',async function(){
  try {
    const salt=await bycrpt.genSalt();
    this.password=await bycrpt.hash(this.password,salt)
  } catch (error) {
    console.log(error)
  }
})

module.exports=Mongoose.model('products',productSchema);
