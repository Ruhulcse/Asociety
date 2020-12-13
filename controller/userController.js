const User = require('../model/user');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError')

 // creating tour function 
 const signToken = id =>{
     return jwt.sign({id}, process.env.JWTSecert, {
        expiresIn:"9m"
    });
 }

 exports.createUser = catchAsync(async ( req, res)=>{
     console.log(req.body)

     try{
         const newUser = await User.create(req.body); /// ger all the body request and pass it to the database 
         const token = signToken(newUser._id);
         
         res.status(201).json({
             status:'success messsgea ',
             token,
             data:{
                 User:newUser
             }
         })

     }catch(err){
         res.status(400).json({
             status:'Failed',
             ErrorMessage:"User already exists Or passoeed",
             Reason:err
         })
     }
 })
 // get users (Admin Function) 

 // login 
 exports.login = catchAsync(async (req, res, next)=>{ // next work as a middle 
     // get email Address and password 
     try {
     const {userIdentifer, password} = req.body;
     if (!userIdentifer || !password ){
        res.status(400).json({
            status:'Failed',
            ErrorMessage:"Email address or password is not founded ",
            mesasge:Error
        })
     }
     const user = await User.findOne({userIdentifer}).select('+password');
     // check if email address and password is correct 
     // if everythig is okay send toke 
    // pass the passwrd and the hash password too 
     if (!user || !(await user.correctPassword(password, user.password))){
        res.status(401).json({
            status:'Failed',
            ErrorMessage:"Incorrect email or password"          
        })
     }
     const token = signToken(user._id);
     res.status(200).json({
        status:'success login ',
        token:token,
        user:user
     })
     }catch(Error){
            res.status(400).json({
            status:'Failed',
            ErrorMessage:"Email address or password is wrong",
            mesasge:Error
        })
     }  
 });
 
 // get users
 exports.Users = catchAsync(async(req, res)=>{
     // get all the users 
     console.log("Hi before getting user's object")
     try{

        const mUser = await User.find(req.body);
        if (!mUser){
            res.json.status(200)({
                message:"No User's found"
            })
        }else {
            res.json({
                NumberOfUsers:mUser.length,
                Users:mUser
            })
        }

     }catch(Error){
        res.status(400).json({
        status:'Failed',
        mesasge:Error
    })
     }
        

    
 })
// delete users 
exports.deleteUser = catchAsync(async(req, res)=>{
    console.log("Hi from deleting user function");
    const mDeletByID = await User.findByIdAndDelete(req.params.id);
    console.log(mDeletByID)
    if (!mDeletByID){
        res.json({
            status:"Faild",
            message:"There is no such an ID"
            
        })
    }
    res.json({
        mesasge:"User has deleted"
    })

})

// Update users 


