require('dotenv').config();

const connectDB=require('./db/connect');
const productsList=require('./products.json');
const productModel=require('./model/productSchema');

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_UI);
        await productModel.deleteMany();
        await productModel.create(productsList);
    } catch (error) {
        console.log(error);
    }
     

}

start();
