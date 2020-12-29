const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const crypto=require('crypto');
const bcrypt= require('bcrypt');
const User =mongoose.model("User"); 
const jwt =require('jsonwebtoken');
const {jwt_secret}=require('../config/Key.js');
const requireLogin = require('../middleWare/requireLogin');
const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')
const {SENDGRID_API,EMAIL}=require('../config/Key')


const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))
router.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!email || !password || !name){
        res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,10)
        .then(hashePassword=>{
            const user= new User({
                name,
                email,
                password:hashePassword,
                pic
            })
            user.save()
            .then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"rakesh.gupta.chotu016@gmail.com",
                    subject:"signup success",
                    html:"<h1> welcome to instagram</h1>"
                })
                res.json({message:"saved successfully"})
            })
        .catch(err=>{
            console.log(err)
        })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"please check your email and password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message: "succesfully signed in"})
                const token=jwt.sign({_id:savedUser._id},jwt_secret)
                const {_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.post('/reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token=buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User don't exists with this email"})
            }
            user.resetToken=token
            user.expireToken=Date.now()+3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"rakesh.gupta.chotu016@gmail.com",
                    subject:"password-reset",
                    html:`
                    <p> your request for password reset</p>
                    <h5> click on this <a href="${EMAIL}/reset/${token}"> link</a> to reset the password</h5>`
                })
            })
            res.json({message:"check your email"})
        })
    })
})

router.post('/new-password',(req,res)=>{
    const NewPassword=req.body.password
    const sentToken=req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(NewPassword,10).then(hashePassword=>{
            user.password=hashePassword
            user.resetToken=undefined
            user.expireToken=undefined
            user.save().then((savedUser)=>{
                res.json({message:"password updated"})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router

// experimenting with git