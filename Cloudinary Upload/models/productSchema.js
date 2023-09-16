const Mongoose=require('mongoose');

const productSchema= new Mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please Provide name '],
  },
  price:{
    type:Number,
    required:[true,'Please Provide price of product']
  },
  image:{
    type:String,
    required:[true,'Provide image']
  }           

})

module.exports=Mongoose.model('products',productSchema);
