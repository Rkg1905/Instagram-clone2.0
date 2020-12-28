const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const { jwt_secret } = require('../config/Key')
const User=mongoose.model("User")

module.exports= (req,res,next)=>{
    const {authorization} =req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})

    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in here"})
        }
        const {_id}=payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next()
        })
        
    })

}

// {   "title":"chechking the post connection",
//     "body": "lets see the post"
// }

// {
//     "email":"rkgiitkgp@gmail.com",
//     "password":"12345"
// }