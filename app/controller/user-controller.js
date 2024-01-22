const jwt = require('jsonwebtoken')
const User = require('../model/user-model')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
require('dotenv').config()
const userCltr = {}
userCltr.register = async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})      
    }
    const body = _.pick(req.body,['username','email','passwordHash','profileImage'])
    body.profileImage = req.file.filename
    try{
        const user = new User(body)
        const salt= await bcryptjs.genSalt()
        const encryptedPassword= await bcryptjs.hash(user.passwordHash,salt)
        user.passwordHash=encryptedPassword 
         await user.save()
         res.status(201).json(user)
    }
    catch(e){
        console.log(e)
    }
}


userCltr.login = async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const body = _.pick(req.body ,['email','passwordHash'])
    try{
        const user = await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({errors:'invalid email/password'})
        }
   
        const result = await bcryptjs.compare(body.passwordHash,user.passwordHash)
        if(!result){
            return res.status(404).json({errors:'invalid email/password'})
        }
        const tokenData = {id:user._id}

        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'14d'})
        res.json({token:token})
}   catch(e){
    console.log(e) }
}

userCltr.profile =async(req,res) =>{
    try{
        const user=await User.findById(req.user.id)
        res.json(user)
    }catch(e){
        res.status(500).json(e)
    }
}

userCltr.profileUpdate = async(req,res) =>{
    const body = _.pick(req.body,["bio"])
    try{
        const user = await User.findByIdAndUpdate(req.user.id,body,{new:true})
        res.status(200).json(user)
    } catch(e){
        res.status(500).json(e)
    }
}

module.exports = userCltr