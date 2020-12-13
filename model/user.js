const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')
const userSchema = new mongoose.Schema({
    userIdentifer:{
        type:String,
        required:[true,'Email address is required'],
        unique:true,
        trim:true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
      

    },
    password:{
        type:String,
        required:[true,'Password is require'],
        trim:true,
        minlength:8,
        select:false
        

    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    description:{
        type:String,
        trim:true,
        default:"None"
        
    },
    imageCover:{
        type:String,
        required:true,
        default:"URL"
    },
    userAddress:{
        type:String,
        required:true,
        default:"None"
        
    },
    phoneNumber:{
        type:String,
        required:true,
        default:"+967000000000"
    }

 
});

// use middelware to hash the password 
userSchema.methods.correctPassword = async function(givenPassword, userPassword){
    return await bcryptjs.compare(givenPassword,userPassword)    
};

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 12);
})


const User = mongoose.model('Users',userSchema );

module.exports =  User;