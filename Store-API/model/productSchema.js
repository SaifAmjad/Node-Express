const mongoos=require('mongoose');

const productsSchema=new mongoos.Schema({
    name:{
        type:String,
        required:[true,'Please provide product name'],
    },
    price:{
        type:Number,
        required:[true,'Please provide product price'],
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:`Given value is not supported`
        }
    }

})

let schemaModel=mongoos.model('Products',productsSchema);

module.exports=schemaModel;