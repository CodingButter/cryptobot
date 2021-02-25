const jwt = require("jsonwebtoken");
require("dotenv").config()
const user = require("../models/user")
const getJWTToken = ({email,ip,password})=>{
    const data = [ip,email,password].join("");
    return jwt.sign({data},process.env.JWT_SECRET,{expiresIn:"10h"});
}


const errorHandler = (error)=>{
    let code = 400
    let errorMessage = {}

    //JWT Errors
    if(error.message.includes("jwt must be provided")){
        errorMessage.auth = "No Token Was Provided"
        code = 401
    }

    if(error.message.includes('jwt malformed')){
        errorMessage.auth = "Incorrect or Malformed Token"
        code = 403
    }

    //Login errors
    if(error.message==='Incorrect Email' || error.message==='Incorrect Password'){
        errorMessage.login = "Email or password was incorrect"
    }

    //Signup Errors

    //Non Duplication Checks
    if(error.message.includes("Password is too short")){
        errorMessage.password = error.message.split(":")[2].trim()
    }

    if(error.message==='User validation failed: email: Invalid email'){
        errorMessage.email = "Invalid Email or Password"
    }


    //Duplication Checks
    if(error.code===11000){
        if(error.message.includes("email")){
            errorMessage.email = "Email Already Taken"
        }
    }


    console.log({message:error.message,code:error.code})

    return {code,error:errorMessage}
}


/**
 * @route POST /auth/login
 * @description Login User
 * @access Public
 */
module.exports.login_post = async (req,res)=>{
    try{
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const {email,password} = req.body
        const loggedinUser = await user.login({email,password})
        const token = getJWTToken({ip,email,password})
        return res.status(200).json({user:loggedinUser._id,token})
    //Make sure to return response
    }catch(err){
        let {code,error} = errorHandler(err)
        return res.status(code).json({
            error
        })
    }
}

module.exports.signup_post = async (req,res)=>{
    console.log(req.body)

    try{
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const {email,password} = req.body
        const userCreate = await user.create({
            email,
            password
        })
        const token = getJWTToken({ip,email,password})
        return res.status(200).json({user:userCreate._id,token})
    //Make sure to return response
    }catch(err){
        let {code,error} = errorHandler(err)
        return res.status(code).json({
            error
        })
    }
}

module.exports.authenticateUserToken = (req,res,next) =>{
    try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    console.log(authHeader)
    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error)throw(new Error(error))
        next()
    })
    }catch(err){
        let {code,error} = errorHandler(err);
        return res.status(code).json({
            error
        })
    }
}

