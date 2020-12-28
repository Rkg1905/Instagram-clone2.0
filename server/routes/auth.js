const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const bcrypt= require('bcrypt');
const User =mongoose.model("User"); 
const jwt =require('jsonwebtoken');
const {jwt_secret}=require('../config/Key.js');
const requireLogin = require('../middleWare/requireLogin');



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
module.exports = router

// experimenting with git