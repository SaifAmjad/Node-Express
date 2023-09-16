const Mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide your name'],
        minLength:3,
        maxLength:25,
    },
    lastname:{
        type:String,
        required:[true,'Please Provide your last name'],
        minLength:2,
    },
    location:{
        type:String,
        required:[true,'Please Provide your location'],
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
        match:[ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please Provide correct email']
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minLength:5
    }

})

userSchema.pre('save',async function(){
    try {
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(this.password,salt);
        this.password=hashPass;
        
    } catch (error) {
        next(error);
    }
})

userSchema.methods.getToken=async function(){
        try {
            const token=await jwt.sign({id:this._id,name:this.name,location:this.location},process.env.SECRET,{expiresIn:'20d'});
            return token;
        } catch (error) {
            next(error);
        }
}

userSchema.methods.comparePass=async function(pass){
    try {
        const comparePass=await bcrypt.compare(pass,this.password);
        return comparePass;
    } catch (error) {
        next(error)
    }
}


module.exports= new Mongoose.model('users',userSchema);